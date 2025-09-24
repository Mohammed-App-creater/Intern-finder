import { Request, Response } from "express";
import { messageService } from "./message.service";
import { createMessageSchema, createConversationSchema } from "./message.validator";

export const messageController = {
  async getMessages(req: Request, res: Response) {
    const { conversationId } = req.params;
    const messages = await messageService.getMessages(conversationId);
    res.json(messages);
  },

  async createMessage(req: Request, res: Response) {
    const parsed = createMessageSchema.parse(req.body);
    const message = await messageService.createMessage(parsed);
    res.json(message);
  },

  async getConversations(req: Request, res: Response) {
    const user = req.user as any; // assume populated by auth middleware
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (user.role === "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const type: "company" | "talent" = user.role === "COMPANY" ? "company" : "talent";
    const id = type === "company" ? (user.companyId ?? user.id) : (user.talentId ?? user.id);

    const convos = await messageService.getConversationsForUser({ type, id });
    res.json(convos);
  },

  async createConversation(req: Request, res: Response) {
    const parsed = createConversationSchema.parse(req.body);
    const convo = await messageService.createConversation(parsed);
    res.json(convo);
  },
};
