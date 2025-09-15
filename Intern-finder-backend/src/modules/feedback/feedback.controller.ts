import { Request, Response, NextFunction } from "express";
import { FeedbackService } from "./feedback.service";

/**
 * Expect req.user to be set by authenticate middleware:
 * req.user = { id: string, companyId?: string, isAdmin?: boolean }
 */

export const FeedbackController = {
  async submitFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const { companyId, interviewId } = req.params as { companyId: string; interviewId: string };
      const { interviewerId, rating, recommendation, comments } = req.body as any;
      const user = req.user as any;
      if (!user) return res.status(401).json({ error: "Unauthorized" });

      const created = await FeedbackService.createFeedback({
        companyId,
        interviewId,
        interviewerId,
        rating,
        recommendation,
        comments,
        createdByTalentId: user.id,
      });

      return res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },

  async listFeedbacks(req: Request, res: Response, next: NextFunction) {
    try {
      const { companyId, interviewId } = req.params as { companyId: string; interviewId: string };
      const user = req.user as any;
      const viewerIsCompanyMember = !!user && (user.isAdmin || user.companyId === companyId || (user.companyIds && user.companyIds.includes(companyId)));

      const result = await FeedbackService.listFeedbacks(interviewId, companyId, viewerIsCompanyMember);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
