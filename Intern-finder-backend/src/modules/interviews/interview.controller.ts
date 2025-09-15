// File: interview.controller.ts
import { Request, Response } from "express";
import { InterviewService } from "./interview.service";
import { NotFoundError, BadRequestError, ForbiddenError } from "../../utils/errors";

export class InterviewController {
  static async getByApplication(req: Request, res: Response) {
    try {
      const { companyId, applicationId } = req.params;
      const filters = req.query;
      const userId = (req as any).auth?.userId;
      const data = await InterviewService.fetchInterviewsForApplication({ companyId, applicationId, userId, filters });
      return res.json(data);
    } catch (err: any) {
      if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
      if (err instanceof ForbiddenError) return res.status(403).json({ message: err.message || "Forbidden" });
      return res.status(400).json({ message: err.message || "Bad request" });
    }
  }

  static async getCompanyInterviews(req: Request, res: Response) {
    try {
      const { companyId } = req.params;
      const filters = req.query as any;
      const userId = (req as any).auth?.userId;
      const result = await InterviewService.fetchCompanyInterviews({ companyId, userId, filters });
      return res.json(result);
    } catch (err: any) {
      if (err instanceof ForbiddenError) return res.status(403).json({ message: err.message || "Forbidden" });
      return res.status(400).json({ message: err.message || "Bad request" });
    }
  }

  static async createInterview(req: Request, res: Response) {
    try {
      const { companyId, applicationId } = req.params;
      const payload = req.body;
      const createdById = (req as any).auth?.userId;
      const interview = await InterviewService.createInterview({ companyId, applicationId, payload, createdById });
      return res.status(201).json(interview);
    } catch (err: any) {
      if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
      if (err instanceof ForbiddenError) return res.status(403).json({ message: err.message || "Forbidden" });
      return res.status(400).json({ message: err.message || "Bad request" });
    }
  }

  static async updateInterview(req: Request, res: Response) {
    try {
      const { companyId, interviewId } = req.params;
      const payload = req.body;
      const updatedById = (req as any).auth?.userId;
      const updated = await InterviewService.updateInterview({ companyId, interviewId, payload, updatedById });
      return res.json(updated);
    } catch (err: any) {
      if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
      if (err instanceof ForbiddenError) return res.status(403).json({ message: err.message || "Forbidden" });
      return res.status(400).json({ message: err.message || "Bad request" });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { companyId, interviewId } = req.params;
      const payload = req.body;
      const updatedById = (req as any).auth?.userId;
      const result = await InterviewService.updateStatus({ companyId, interviewId, payload, updatedById });
      return res.json(result);
    } catch (err: any) {
      if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
      if (err instanceof ForbiddenError) return res.status(403).json({ message: err.message || "Forbidden" });
      return res.status(400).json({ message: err.message || "Bad request" });
    }
  }

  static async deleteInterview(req: Request, res: Response) {
    try {
      const { companyId, interviewId } = req.params;
      const payload = req.body;
      const deletedById = (req as any).auth?.userId;
      const result = await InterviewService.softDeleteInterview({ companyId, interviewId, payload, deletedById });
      return res.json(result);
    } catch (err: any) {
      if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
      if (err instanceof ForbiddenError) return res.status(403).json({ message: err.message || "Forbidden" });
      return res.status(400).json({ message: err.message || "Bad request" });
    }
  }

  static async addAssignments(req: Request, res: Response) {
    try {
      const { companyId, interviewId } = req.params;
      const { talentIds } = req.body;
      const addedById = (req as any).auth?.userId;
      const created = await InterviewService.addAssignments({ companyId, interviewId, talentIds, addedById });
      return res.status(201).json(created);
    } catch (err: any) {
      if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
      if (err instanceof ForbiddenError) return res.status(403).json({ message: err.message || "Forbidden" });
      return res.status(400).json({ message: err.message || "Bad request" });
    }
  }

  static async removeAssignment(req: Request, res: Response) {
    try {
      const { companyId, interviewId, talentId } = req.params as any;
      const removedById = (req as any).auth?.userId;
      const result = await InterviewService.removeAssignment({ companyId, interviewId, talentId, removedById });
      return res.json(result);
    } catch (err: any) {
      if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
      if (err instanceof ForbiddenError) return res.status(403).json({ message: err.message || "Forbidden" });
      return res.status(400).json({ message: err.message || "Bad request" });
    }
  }
}
