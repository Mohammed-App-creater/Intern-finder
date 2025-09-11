import { NextFunction, Request, Response } from "express";
import { ApplicationService } from "./applications.service";

export class ApplicationController {
    static async listForCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { companyId } = req.params as { companyId: string };
            const user = (req as any).user || {};
            console.log(user, companyId, user.companyId == companyId);
            if (!user || !user.companyMember || user.companyId !== companyId) {
                res.status(403).json({ error: "Forbidden" });
                return;
            }
            const params = req.query as any;
            const data = await ApplicationService.listJobApplicationsForCompany(companyId, {
                jobId: params.jobId,
                stage: params.stage,
                q: params.q,
                page: params.page ? Number(params.page) : undefined,
                limit: params.limit ? Number(params.limit) : undefined,
                sort: params.sort,
                order: params.order,
            });
            res.status(200).json(data);
        } catch (e: any) {
            next(e);
        }
    }

    static async getDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { companyId, applicationId } = req.params as { companyId: string; applicationId: string };
            const user = (req as any).user || {};
            const requesterTalentId: string | undefined = user.talentId;
            const isCompanyMember: boolean = user.companyMember && user.companyId === companyId;

            if (!isCompanyMember && !requesterTalentId) {
                res.status(403).json({ error: "Forbidden" });
                return;
            }

            const details = await ApplicationService.getApplicationDetails(companyId, applicationId, requesterTalentId);
            res.status(200).json(details);
        } catch (e: any) {
            next(e);
        }
    }

    static async updateStage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { companyId, applicationId } = req.params as { companyId: string; applicationId: string };
            const user = (req as any).user || {};
            if (!user || !user.companyMember || user.companyId !== companyId) {
                res.status(403).json({ error: "Forbidden" });
                return;
            }
            const { stageKey, reason, notifyCandidate } = req.body as { stageKey: any; reason?: string; notifyCandidate?: boolean };
            const updated = await ApplicationService.updateApplicationStage(companyId, applicationId, {
                stageKey,
                reason,
                actorTalentId: user.talentId,
                notifyCandidate: !!notifyCandidate,
            });
            res.status(200).json(updated);
        } catch (e: any) {
            next(e);
        }
    }

    static async addNote(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { companyId, applicationId } = req.params as { companyId: string; applicationId: string };
            const user = (req as any).user || {};
            if (!user || !user.companyMember || user.companyId !== companyId) {
                res.status(403).json({ error: "Forbidden" });
                return;
            }
            const authorTalentId = user.talentId as string;
            const { content, isPrivate, parentId } = req.body as { content: string; isPrivate?: boolean; parentId?: string };
            const note = await ApplicationService.addApplicationNote(companyId, applicationId, authorTalentId, { content, isPrivate, parentId });
            res.status(201).json(note);
        } catch (e: any) {
            next(e);
        }
    }

    static async listNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { companyId, applicationId } = req.params as { companyId: string; applicationId: string };
            const user = (req as any).user || {};
            const isCompanyMember = !!(user && user.companyMember && user.companyId === companyId);
            const onlyPublic = (req.query.onlyPublic as any) === true || (req.query.onlyPublic as any) === "true";

            const result = await ApplicationService.listApplicationNotes(companyId, applicationId, {
                onlyPublic,
                requesterTalentId: user.talentId,
                isCompanyMember,
            });
            res.status(200).json(result);
        } catch (e: any) {
            next(e);
        }
    }
} 