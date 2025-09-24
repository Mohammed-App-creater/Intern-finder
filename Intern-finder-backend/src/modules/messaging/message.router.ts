import { Router } from "express";
import { messageController } from "./message.controller";
import { createConversationSchema, createMessageSchema, sendMessageSchema } from "./message.validator"
import { authenticate } from "../../middlewares/auth.middleware"
import { validate } from "../../middlewares/validate";

const router = Router();
router.use(authenticate);
/**
 * @swagger
 * tags:
 *   name: Messaging
 *   description: API for messaging between companies and talents
 */

/**
 * @swagger
 * /conversations:
 *   get:
 *     summary: Get all conversations for the authenticated user
 *     tags: [Messaging]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of conversations
 */
router.get("/conversations", messageController.getConversations);

/**
 * @swagger
 * /conversations:
 *   post:
 *     summary: Create a new conversation
 *     tags: [Messaging]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company1Id:
 *                 type: string
 *               company2Id:
 *                 type: string
 *               talent1Id:
 *                 type: string
 *               talent2Id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created conversation
 */
router.post("/conversations", validate(createConversationSchema, "body"), messageController.createConversation);

/**
 * @swagger
 * /conversations/{conversationId}/messages:
 *   get:
 *     summary: Get all messages in a conversation
 *     tags: [Messaging]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         schema:
 *           type: string
 *         required: true
 *         description: Conversation ID
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get("/conversations/:conversationId/messages", messageController.getMessages);

/**
 * @swagger
 * /send-messages:
 *   post:
 *     summary: Send a new message
 *     tags: [Messaging]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conversationId:
 *                 type: string
 *               content:
 *                 type: string
 *               companyId:
 *                 type: string
 *               talentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Created message
 */
router.post("/send-messages", validate(sendMessageSchema, "body"), messageController.createMessage);

export default router;
