import prisma from "../../utils/prisma"; // adjust path
import { NotificationService } from "../notification/notification.service";
import { NotificationType, ApplicationStatus, Prisma } from "@prisma/client";

export class JobApplicationService {
    static async createApplication(talentId: string, jobId: string, additionalInfo?: any, resumeUrl?: string) {
        const job = await prisma.job.findUnique({ where: { id: jobId }, select: { id: true, title: true, companyId: true } });
        if (!job) {
            throw new Error("Job not found");
        }

        // Avoid duplicate application
        const existing = await prisma.jobApplication.findFirst({ where: { jobId, talentId } });
        if (existing) {
            throw new Error("Already applied to this job");
        }

        const application = await prisma.jobApplication.create({
            data: { jobId, talentId, additionalInfo, resumeUrl },
            include: { job: true },
        });

        // Notify company about new candidate
        await NotificationService.notifyUser(
            job.companyId,
            "New candidate applied",
            `A new application was submitted for ${job.title}.`,
            NotificationType.NEW_CANDIDATE
        );

        return application;
    }

    static async listMyApplications(talentId: string) {
        return prisma.jobApplication.findMany({
            where: { talentId },
            orderBy: { appliedAt: "desc" },
            include: { job: true },
        });
    }

    static async updateStatus(companyId: string, applicationId: string, status: ApplicationStatus) {
        const application = await prisma.jobApplication.findUnique({
            where: { id: applicationId },
            include: { job: true, talent: true },
        });
        if (!application) {
            throw new Error("Application not found");
        }

        // Authorization: ensure the application belongs to a job owned by company
        if (application.job.companyId !== companyId) {
            throw new Error("Not authorized to update this application");
        }

        const updated = await prisma.jobApplication.update({
            where: { id: applicationId },
            data: { status },
            include: { job: true, talent: true },
        });

        // Notify talent on acceptance/rejection/interview
        if (status === "accepted" || status === "rejected" || status === "interview") {
            const title =
                status === "accepted"
                    ? "Application accepted"
                    : status === "rejected"
                        ? "Application rejected"
                        : "Interview update";

            const message =
                status === "accepted"
                    ? `Congratulations! Your application for ${updated.job.title} was accepted.`
                    : status === "rejected"
                        ? `Your application for ${updated.job.title} was not selected.`
                        : `Your application for ${updated.job.title} has been moved to interview.`;

            await NotificationService.notifyUser(
                updated.talentId,
                title,
                message,
                NotificationType.JOB_RESPONSE
            );
        }

        return updated;
    }

    static async listJobApplicationsForCompany(
        companyId: string,
        query: {
            jobId?: string;
            stage?: string;
            q?: string;
            page?: number;
            limit?: number;
            sortBy?: "appliedAt" | "stage";
            order?: "asc" | "desc";
        }
    ) {
        const { jobId, stage, q, page = 1, limit = 20, sortBy = "appliedAt", order = "desc" } = query;

        // If jobId provided, ensure the job belongs to company
        if (jobId) {
            const job = await prisma.job.findFirst({ where: { id: jobId, companyId }, select: { id: true } });
            if (!job) throw new Error("Job not found or not owned by company");
        }

        const where: Prisma.JobApplicationWhereInput = {
            ...(jobId ? { jobId } : { job: { companyId } }), // if jobId set filter by jobId, else all jobs for company
            ...(stage ? { stage } : {}),
            ...(q
                ? {
                    OR: [
                        { talent: { fullName: { contains: q, mode: "insensitive" } } },
                        { talent: { email: { contains: q, mode: "insensitive" } } },
                    ],
                }
                : {}),
        };

        const total = await prisma.jobApplication.count({ where });

        const items = await prisma.jobApplication.findMany({
            where,
            orderBy: { [sortBy]: order },
            skip: (page - 1) * limit,
            take: limit,
            select: {
                id: true,
                appliedAt: true,
                // talent brief info (left panel list requirements)
                talent: {
                    select: {
                        id: true,
                        fullName: true,
                        profileImageUrl: true,
                        rating: true,
                    },
                },
                // job role/title
                job: {
                    select: {
                        id: true,
                        title: true,
                        // if you have `role` field, include it here instead or in addition
                    },
                },

                // interview 

                Interview: {
                    select: {
                        status: true,
                    }
                }
            },
        });

        return { total, page, limit, items };
    }


    // add a note to application (stage-level note)
    static async addApplicationNote(companyId: string, applicationId: string, authorTalentId: string, payload: { content: string; isPrivate?: boolean; parentId?: string }) {
        // ensure application belongs to company
        const app = await prisma.jobApplication.findFirst({ where: { id: applicationId, job: { companyId } }, select: { id: true } });
        if (!app) throw new Error("Application not found or not owned by company");

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
}



