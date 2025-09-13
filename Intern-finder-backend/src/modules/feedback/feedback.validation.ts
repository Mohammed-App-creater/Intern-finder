import { z } from "zod";

export const paramsCompanyInterviewSchema = z.object({
  companyId: z.uuid(),
  interviewId: z.uuid(),
});


export const submitFeedbackBodySchema = z.object({
  rating: z.number().int().min(1).max(5),
  recommendation: z.enum(["PROCEED", "HOLD", "REJECT"]),
  comments: z.string().max(2000).optional(),
});
