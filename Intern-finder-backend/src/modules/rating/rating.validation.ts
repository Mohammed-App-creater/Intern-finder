import { z } from "zod";

export const paramsCompanyApplicationSchema = z.object({
  companyId: z.string().uuid(),
  applicationId: z.string().uuid(),
});

export const submitApplicationRatingBodySchema = z.object({
  raterTalentId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional(),
});
