// companyMember.validation.ts
import { z } from "zod";

export const paramsCompanyIdSchema = z.object({
  companyId: z.string().uuid(),
});

export const paramsTalentIdSchema = z.object({
  talentId: z.string().uuid(),
});

export const listMembersQuery = z.object({
  role: z.string().optional(),
  active: z.coerce.boolean().optional(),
});

export const createMemberBody = z.object({
  talentId: z.string().uuid(),
  role: z.string().optional(),
  isAdmin: z.boolean().optional().default(false),
});

export const availabilityQuery = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});

export const conflictCheckBody = z.object({
  interviewerTalentIds: z.array(z.string().uuid()).min(1),
  startTime: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "Invalid startTime" }),
  endTime: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "Invalid endTime" }),
  excludeInterviewId: z.string().uuid().optional(),
});
