import { z } from "zod";

export const applicationParamsSchema = z.object({
  companyId: z.string().uuid(),
  applicationId: z.string().uuid(),
});

export const hireActionBodySchema = z
  .object({
    offerDetails: z.record(z.string(), z.any()),
  })
  .strict();

export const declineActionBodySchema = z
  .object({
    reason: z.string().max(1000),
    notifyCandidate: z.boolean().optional().default(true),
  })
  .strict();

export const shareActionBodySchema = z
  .object({
    toTalentIds: z.array(z.string().uuid()).min(1),
    message: z.string().max(1000),
  })
  .strict();
