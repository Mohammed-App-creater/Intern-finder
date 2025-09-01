import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { getAnalyticsController } from "./analytics.controller";

const router = Router();

// GET /analytics
/**
 * @swagger
 * tags:
 *   - name: Analytics
 *     description: Analytics management
 * 
 */
router.get("/", getAnalyticsController);

export default router;
