import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { getAnalyticsController } from "./analytics.controller";

const router = Router();

// GET /analytics
/**
 * @openapi
 * /analytics:
 *   get:
 *     summary: Get analytics summary for the platform
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Analytics summary fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Analytics'
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getAnalyticsController);


/**
 * @swagger
 * components:
 *   schemas:
 *     Analytics:
 *       type: object
 *       description: Arbitrary analytics summary object returned by the analytics service
 *       additionalProperties: true
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         status:
 *           type: integer
 *           format: int32
 */

export default router;
