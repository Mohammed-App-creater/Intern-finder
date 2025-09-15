import prisma from "../../utils/prisma";
import { ApplicationStatus, Prisma } from "@prisma/client";

export type ListParams = {
    jobId?: string;
    stage?: ApplicationStatus;
    q?: string;
    page?: number;
    limit?: number;
    sort?: "appliedAt" | "stage";
    order?: "asc" | "desc";
};

export class ApplicationService {
    // List applications scoped to a company with filters and minimal selects
    static async listJobApplicationsForCompany(companyId: string, params: ListParams): Promise<{ total: number; page: number; limit: number; items: Array<{ applicationId: string; appliedAt: Date; status: ApplicationStatus; talent: { id: string; fullName: string; profileImageUrl: string | null; rating: number | null }; job: { id: string; title: string } }> }> {
        const { jobId, stage, q, page = 1, limit = 20, sort = "appliedAt", order = "desc" } = params;

        // If jobId is provided, verify it belongs to the company
        if (jobId) {
            const job = await prisma.job.findFirst({ where: { id: jobId, companyId }, select: { id: true } });
            if (!job) throw new Error("Job not found or not owned by company");
        }

        // Build where with indexed fields: jobId, job.companyId, status
        const where: Prisma.JobApplicationWhereInput = {
            ...(jobId ? { jobId } : { job: { companyId } }),
            ...(stage ? { status: stage } : {}),
            ...(q
                ? {
                    OR: [
                        { talent: { fullName: { contains: q, mode: "insensitive" } } },
                        { talent: { email: { contains: q, mode: "insensitive" } } },
                    ],
                }
                : {}),
        };

        const [total, rawItems] = await Promise.all([
            prisma.jobApplication.count({ where }),
            prisma.jobApplication.findMany({
                where,
                orderBy: { [sort === "stage" ? "status" : sort]: order },
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    appliedAt: true,
                    status: true,
                    talent: { select: { id: true, fullName: true, profileImageUrl: true, rating: true } },
                    job: { select: { id: true, title: true } },
                },
            }),
        ]);

        const items = rawItems.map((r) => ({
            applicationId: r.id,
            appliedAt: r.appliedAt,
            status: r.status,
            talent: r.talent,
            job: r.job,
        }));

        return { total, page, limit, items };
    }

    // Get full details; allow either company member (via companyId) or owning talent
    static async getApplicationDetails(companyId: string, applicationId: string, requesterTalentId?: string): Promise<any> {
        // Verify application belongs to provided companyId
        const app = await prisma.jobApplication.findFirst({
            where: { id: applicationId, job: { companyId } },
            include: {
                talent: true,
                job: true,
                Interview: {
                    select: {
                        id: true,
                        type: true,
                        status: true,
                        startTime: true,
                        _count: {
                            select: { notes: true },
                        },
                    },
                },
            },
        });

        if (!app) {
            // If not found for company, allow talent owner to view regardless of companyId; but ensure it exists
            const byTalent = requesterTalentId
                ? await prisma.jobApplication.findFirst({
                    where: { id: applicationId, talentId: requesterTalentId },
                    include: {
                        talent: true,
                        job: {
                            select: { id: true, companyId: true, title: true },
                        },
                        Interview: {
                            select: {
                                id: true,
                                type: true,
                                status: true,
                                startTime: true,
                                _count: {
                                    select: { notes: true }, // ✅ count InterviewNote[] per Interview
                                },
                            },
                        },
                    },
                })
                : null;
            return byTalent;
        }

        // Aggregate feedback score if exists
        const feedbackAgg = await prisma.interviewFeedback.aggregate({
            where: { interview: { applicationId } },
            _avg: { rating: true },
        });

        return { ...app, feedbackScore: feedbackAgg._avg.rating ?? null };
    }

    // Transactional stage update + history
    static async updateApplicationStage(companyId: string, applicationId: string, data: { stageKey: ApplicationStatus; reason?: string; actorTalentId?: string; notifyCandidate?: boolean }): Promise<any> {
        // Verify ownership
        const existing = await prisma.jobApplication.findFirst({ where: { id: applicationId, job: { companyId } }, include: { talent: true } });
        if (!existing) throw new Error("Application not found or not owned by company");

        const updated = await prisma.$transaction(async (tx) => {
            const updatedApp = await tx.jobApplication.update({ where: { id: applicationId }, data: { status: data.stageKey }, include: { job: { select: { id: true, title: true } }, talent: { select: { id: true, fullName: true, email: true } } } });
            // Create history record if model exists. This avoids breaking if schema not present.
            try {
                // @ts-ignore - optional chain in runtime if model not generated
                await tx.applicationStageHistory?.create?.({
                    data: {
                        applicationId,
                        fromStage: existing.status,
                        toStage: data.stageKey,
                        changedByTalentId: data.actorTalentId ?? null,
                        reason: data.reason ?? null,
                    },
                });
            } catch {
                // no-op
            }
            return updatedApp;
        });

        if (data.notifyCandidate) {
            try {
                // Fallback to existing notification service signature in this codebase
                const { NotificationService } = await import("../notification/notification.service");
                await NotificationService.notifyUser(existing.talentId, "Application stage updated", `Your application status changed to ${data.stageKey}.`, "JOB_RESPONSE" as any);
            } catch {
                // ignore
            }
        }

        return updated;
    }

    // Create a note with optional parent (threading)
    static async addApplicationNote(companyId: string, applicationId: string, authorTalentId: string, payload: { content: string; isPrivate?: boolean; parentId?: string }): Promise<any> {
        const app = await prisma.jobApplication.findFirst({ where: { id: applicationId, job: { companyId } }, select: { id: true } });
        if (!app) throw new Error("Application not found or not owned by company");

        if (payload.parentId) {
            const parent = await prisma.interviewNote.findUnique({ where: { id: payload.parentId } });
            if (!parent || parent.applicationId !== applicationId) {
                throw new Error("Parent note not found for this application");
            }
        }

        const note = await prisma.interviewNote.create({
            data: {
                applicationId,
                authorTalentId,
                content: payload.content,
                isPrivate: payload.isPrivate ?? true,
                parentId: payload.parentId ?? null,
            },
        });

        return note;
    }

    static async listApplicationNotes(companyId: string, applicationId: string, options: { onlyPublic?: boolean; requesterTalentId?: string; isCompanyMember?: boolean }): Promise<{ notes: any[] }> {
        const app = await prisma.jobApplication.findFirst({ where: { id: applicationId, job: { companyId } }, select: { id: true } });
        if (!app) throw new Error("Application not found or not owned by company");

        const topLevel = await prisma.interviewNote.findMany({
            where: { applicationId, parentId: null },
            orderBy: { createdAt: "desc" },
            include: { replies: { orderBy: { createdAt: "asc" } } },
        });

        const filterVisibility = (n: any): boolean => {
            if (!options.onlyPublic) return true;
            return n.isPrivate !== true;
        };

        const canSeePrivate = options.isCompanyMember === true;

        const mask = (n: any) => {
            const visible = canSeePrivate || n.isPrivate !== true || n.authorTalentId === options.requesterTalentId;
            if (!visible) return null;
            const replies = (n.replies || [])
                .map(mask)
                .filter((x: any) => x !== null);
            return { ...n, replies };
        };

        const mapped = topLevel
            .filter(filterVisibility)
            .map(mask)
            .filter((x) => x !== null);

        return { notes: mapped };
    }
} 