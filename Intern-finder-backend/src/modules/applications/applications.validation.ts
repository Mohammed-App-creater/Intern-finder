import { z } from "zod";

export const uuidParamSchema = z.object({
    companyId: z.string().uuid(),
});

export const listApplicationsQuerySchema = z
    .object({
        jobId: z.string().uuid().optional(),
        stage: z
            .enum(["pending", "shortlisted", "interview", "offered", "accepted", "rejected"]) // mirrors ApplicationStatus
            .optional(),
        q: z.string().trim().min(1).optional(),
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(20),
        sort: z.enum(["appliedAt", "stage"]).default("appliedAt"),
        order: z.enum(["asc", "desc"]).default("desc"),
    })
    .strict();

export const applicationIdParamSchema = z.object({
    companyId: z.string().uuid(),
    applicationId: z.string().uuid(),
});

export const getNotesQuerySchema = z
    .object({
        onlyPublic: z
            .union([z.boolean(), z.enum(["true", "false"])])
            .optional()
            .transform((v) => {
                if (typeof v === "boolean") return v;
                if (v === undefined) return false;
                return v === "true";
            }),
    })
    .strict();

export const updateStageBodySchema = z
    .object({
        stageKey: z.enum(["pending", "shortlisted", "interview", "offered", "accepted", "rejected"]),
        reason: z.string().max(1000).optional(),
        notifyCandidate: z.boolean().optional().default(false),
    })
    .strict();

export const addNoteBodySchema = z
    .object({
        content: z.string().min(1).max(5000),
        isPrivate: z.boolean().optional().default(true),
        parentId: z.string().uuid().optional(),
    })
    .strict(); 