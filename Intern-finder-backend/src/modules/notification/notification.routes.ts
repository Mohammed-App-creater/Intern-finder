import { Router } from "express";
import { subscribeToNotifications, getTalentNotifications, getCompanyNotifications } from "./notification.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { sseManager } from "../../infrastructure/notifications/sseManager";


const router = Router();


/**
 * @openapi
 * /notifications/stream:
 *   get:
 *     summary: Subscribe to server-sent events stream for notifications
 *     description: Opens a Server-Sent Events (SSE) stream that sends notification events to the authenticated user.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Stream opened successfully. The response is an event stream (text/event-stream).
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *               example: "data: { \"type\": \"notification\", \"payload\": {...} }\n\n"
 *       '401':
 *         description: Unauthorized - missing or invalid authentication token
 */
router.get("/stream", authenticate, subscribeToNotifications);

/**
 * @openapi
 * /notifications/talent:
 *   get:
 *     summary: Get talent notifications
 *     description: Fetch notifications for the authenticated talent user. Returns a JSON envelope with success, data and error fields.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Array of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       message:
 *                         type: string
 *                       type:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       '401':
 *         description: Unauthorized
 */
router.get("/talent", authenticate, getTalentNotifications);

/**
 * @openapi
 * /notifications/company:
 *   get:
 *     summary: Get company notifications
 *     description: Fetch notifications for the authenticated company user. Returns a JSON envelope with success, data and error fields.
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Array of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       message:
 *                         type: string
 *                       type:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 error:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *       '401':
 *         description: Unauthorized
 */
router.get("/company", authenticate, getCompanyNotifications);

/**
 * @openapi
 * /notifications/debug/ping:
 *   get:
 *     summary: Debug ping for notifications SSE
 *     description: Broadcasts a test notification to all connected SSE clients and returns a simple JSON response. No authentication required.
 *     tags:
 *       - Notifications
 *     responses:
 *       '200':
 *         description: Ping sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 */
router.get("/debug/ping", (req, res) => {
  sseManager.broadcast("notification", { message: "Hello from server!" });
  res.json({ ok: true });
});

export default router;
