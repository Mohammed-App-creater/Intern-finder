import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { getAnalyticsController } from "./analytics.controller";

const router = Router();

// GET /analytics
/**
 * @swagger
 * tags:
 *   - name: Analytics
 *     description: Analytics management
 *
 * /api/analytics:
 *   get:
 *     summary: Get aggregated analytics counts (jobs, companies, talents)
 *     tags:
 *       - Analytics
 *     responses:
 *       200:
 *         description: Aggregated counts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     jobCount:
 *                       type: integer
 *                       example: 42
 *                     companyCount:
 *                       type: integer
 *                       example: 10
 *                     talentCount:
 *                       type: integer
 *                       example: 100
 *       500:
 *         description: Server error
 * 
 */
router.get("/", getAnalyticsController);

export default router;
