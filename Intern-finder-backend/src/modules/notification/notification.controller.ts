// controllers/notificationController.ts
import { Request, Response } from "express";
import { sseManager } from "../../infrastructure/notifications/sseManager";
import { NotificationService } from "./notification.service";



export const subscribeToNotifications = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }
  const userId = req.user.id;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  sseManager.addClient(userId, res);

  req.on("close", () => {
    sseManager.removeClient(userId);
  });
};

export const getTalentNotifications = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ success: false, data: null, error: "Unauthorized" });
  try {
    const notifications = await NotificationService.getTalentNotifications(req.user.id);
    return res.json({ success: true, data: notifications, error: null });
  } catch (error: any) {
    return res.status(500).json({ success: false, data: null, error: error?.message || "Failed to fetch notifications" });
  }
};

export const getCompanyNotifications = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ success: false, data: null, error: "Unauthorized" });
  try {
    const notifications = await NotificationService.getCompanyNotifications(req.user.id);
    return res.json({ success: true, data: notifications, error: null });
  } catch (error: any) {
    return res.status(500).json({ success: false, data: null, error: error?.message || "Failed to fetch notifications" });
  }
};
