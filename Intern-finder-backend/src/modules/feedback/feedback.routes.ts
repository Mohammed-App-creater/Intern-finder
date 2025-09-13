import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorizeCompanyMember } from "../../middlewares/authorizeCompanyMember";
import { validate } from "../../middlewares/validate";
import { paramsCompanyInterviewSchema, submitFeedbackBodySchema } from "./feedback.validation";
import { FeedbackController } from "./feedback.controller";

const router = Router();

/**
 * @openapi
 * /companies/{companyId}/interviews/{interviewId}/feedback:
 *   post:
 *     tags:
 *       - Feedback
 *     summary: Submit feedback for an interview
 *     description: Company members can submit feedback for a candidate's interview.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: interviewId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Numeric rating (e.g. 1-5)
 *               recommendation:
 *                 type: string
 *                 description: Short recommendation like "Proceed" or "Reject"
 *               comments:
 *                 type: string
 *                 description: Additional notes about the candidate
 *             required:
 *               - rating
 *     responses:
 *       '201':
 *         description: Feedback submitted successfully
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
// POST feedback
router.post(
    "/companies/:companyId/interviews/:interviewId/feedback",
    authenticate,
    authorizeCompanyMember,
    validate(paramsCompanyInterviewSchema, "params"),
    validate(submitFeedbackBodySchema, "body"),
    FeedbackController.submitFeedback,
);

/**
 * @openapi
 * /companies/{companyId}/interviews/{interviewId}/feedbacks:
 *   get:
 *     tags:
 *       - Feedback
 *     summary: List feedbacks for an interview
 *     description: Returns detailed feedbacks for company members and aggregate view for others.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: interviewId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of feedback entries or an aggregate summary
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
// GET feedbacks (company members get full; others get aggregate only)
router.get(
    "/companies/:companyId/interviews/:interviewId/feedbacks",
    authenticate, // required so req.user can be used to determine view; if you want public non-auth aggregate, remove authenticate
    
    validate(paramsCompanyInterviewSchema, "params"),
    FeedbackController.listFeedbacks,
);

export default router;
