import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  environmentType: z.string(),
  categories: z.array(z.string()).nonempty(),
  salaryType: z.enum(["free", "paid"]),
  minSalary: z.number().min(10).optional(),
  maxSalary: z.number().max(1000000).optional(),
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


export const jobFiltersSchema = z.object({
  search: z.string().optional(),
  location: z.string().optional(),
  categories: z.array(z.string()).optional(),
  minExperienceYears: z.coerce.number().int().nonnegative().optional(),
  datePosted: z.enum(["today", "week", "month"]).optional(),
  salaryMin: z.coerce.number().nonnegative().optional(),
  salaryMax: z.coerce.number().nonnegative().optional(),
  tags: z.array(z.string()).optional(),
});

export const jobIdSchema = z.object({
  jobId: z.uuid(),
});

export const jobApplicationSchema = z.object({
  talentId: z.uuid(),
  additionalInfo: z.string().max(500).optional(),
  resumeUrl: z.url(),
});

export type JobFilters = z.infer<typeof jobFiltersSchema>;
export type CreateJobInput = z.infer<typeof createJobSchema>;
