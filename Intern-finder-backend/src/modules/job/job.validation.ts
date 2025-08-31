import { z } from "zod";

export const createJobSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    environmentType: z.string(),
    categories: z.array(z.string()).nonempty(),
    salaryType: z.enum(["free", "paid"]),
    salaryRange: z.string().optional(),
    responsibilities: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 characters"),
    professionalSkills: z.array(z.string()).nonempty(),
    tags: z.array(z.string()).optional(),
    minExperienceYears: z.number().int().nonnegative().optional(),
    degree: z.string().optional(),
    location: z.string(),
    status: z.enum(["live", "closed"]).default("live"),
    capacity: z.number().int().positive().optional(),
    requiredSkills: z.array(z.string()).nonempty(),
});

export const companyIdSchema = z.object({
    companyId: z.uuid(),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
