import { z } from "zod";

// Body: create application
export const createApplicationSchema = z.object({
    jobId: z.uuid(),
    additionalInfo: z.any().optional(),
    resumeUrl: z.url().optional(),
});

// Params: application id
export const applicationIdParamSchema = z.object({
    id: z.uuid(),
});

export const listApplicationsQuerySchema = z.object({
  jobId: z.string().uuid().optional(),
  stage: z.string().optional(), 
  q: z.string().optional(), 
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  sortBy: z.enum(["appliedAt", "stage"]).optional().default("appliedAt"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
});

// Body: update status
export const updateStatusSchema = z.object({
    status: z.enum(["pending", "interview", "accepted", "rejected"]),
});

// Params: job id
export const jobIdParamSchema = z.object({
    jobId: z.uuid(),
});

