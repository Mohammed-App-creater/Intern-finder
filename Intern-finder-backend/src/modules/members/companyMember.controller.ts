// companyMember.controller.ts
import { Request, Response } from "express";
import { CompanyMemberService } from "./companyMember.service";
import { NotFoundError, BadRequestError, ForbiddenError } from "./errors";

export class CompanyMemberController {
  static async listMembers(req: Request, res: Response) {
    try {
      const { companyId } = req.params;
      const filters = req.query;
      const requesterId = (req as any).auth?.userId;
      const data = await CompanyMemberService.listMembers({ companyId, filters, requesterId });
      return res.json(data);
    } catch (err: any) {
      if (err instanceof ForbiddenError) return res.status(403).json({ message: err.message || "Forbidden" });
      return res.status(400).json({ message: err.message || "Bad request" });
    }
  }

  static async addMember(req: Request, res: Response) {
    try {
      const { companyId } = req.params;
      const body = req.body;
      const requesterId = (req as any).auth?.userId;
      const created = await CompanyMemberService.addMember({ companyId, body, requesterId });
      return res.status(201).json(created);
    } catch (err: any) {
      if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
      if (err instanceof ForbiddenError) return res.status(403).json({ message: err.message || "Forbidden" });
      if (err instanceof BadRequestError) return res.status(400).json({ message: err.message });
      return res.status(400).json({ message: err.message || "Bad request" });
    }
  }

  static async getAvailability(req: Request, res: Response) {
    try {
      const { talentId } = req.params;
      const requesterId = (req as any).auth?.userId;
      const query = req.query;
      const data = await CompanyMemberService.getTalentAvailability({ talentId, requesterId, query });
      return res.json(data);
    } catch (err: any) {
      if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
      if (err instanceof ForbiddenError) return res.status(403).json({ message: err.message || "Forbidden" });
      return res.status(400).json({ message: err.message || "Bad request" });
    }
  }

  static async checkConflicts(req: Request, res: Response) {
    try {
      const { companyId } = req.params;
      const body = req.body;
      const requesterId = (req as any).auth?.userId;
      const data = await CompanyMemberService.checkConflicts({ companyId, body, requesterId });
      return res.json(data);
    } catch (err: any) {
      if (err instanceof ForbiddenError) return res.status(403).json({ message: err.message || "Forbidden" });
      return res.status(400).json({ message: err.message || "Bad request" });
    }
  }
}
