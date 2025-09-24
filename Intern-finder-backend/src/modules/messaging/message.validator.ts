import { z } from "zod";

export const sendMessageSchema = z.object({
  conversationId: z.uuid(),
  content: z.string().min(1),
  companyId: z.uuid().optional(),
  talentId: z.uuid().optional(),
});

export const createMessageSchema = z.object({
  conversationId: z.uuid(),
  content: z.string().min(1),
  companyId: z.uuid().optional(),
  talentId: z.uuid().optional(),
});

export const createConversationSchema = z.object({
  company1Id: z.uuid().optional(),
  company2Id: z.uuid().optional(),
  talent1Id: z.uuid().optional(),
  talent2Id: z.uuid().optional(),
});