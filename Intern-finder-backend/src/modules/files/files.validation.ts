import { z } from "zod";

export const applicationParamsSchema = z.object({
  companyId: z.string().uuid(),
  applicationId: z.string().uuid(),
});

export const fileIdParamsSchema = z.object({
  fileId: z.string().uuid(),
});

export const uploadFileBodySchema = z
  .object({
    fileType: z.enum(["RESUME", "COVER_LETTER", "PORTFOLIO", "TEST_RESULT", "OTHER"]),
    description: z.string().max(500).optional(),
  })
  .strict();
