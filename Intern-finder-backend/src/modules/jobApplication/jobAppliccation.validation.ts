import { z } from "zod";

// Body: create application
export const createApplicationSchema = z.object({
    jobId: z.uuid(),
    additionalInfo: z.any().optional(),
    resumeUrl: z.url().optional(),
});

// Params: application id
export const applicationIdParamSchema = z.object({
    id: z.string().uuid(),
});

// Body: update status
export const updateStatusSchema = z.object({
    status: z.enum(["pending", "interview", "accepted", "rejected"]),
});

// Params: job id
export const jobIdParamSchema = z.object({
    jobId: z.string().uuid(),
});


