import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/auth.middleware";
import {
    createApplication,
    listMyApplications,
    listJobApplicationsForCompany,
    updateApplicationStatus,
} from "./jobAppliccation.controller";
import {
    createApplicationSchema,
    applicationIdParamSchema,
    updateStatusSchema,
    jobIdParamSchema,
} from "./jobAppliccation.validation";

const router = Router();

/**
 * @openapi
 * /job-applications:
 *   post:
 *     summary: Submit a new job application
 *     tags:
 *       - Job Applications
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [jobId]
 *             properties:
 *               jobId:
 *                 type: string
 *                 format: uuid
 *               additionalInfo:
 *                 description: Arbitrary additional info for the application
 *               resumeUrl:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *     responses:
 *       '200':
 *         description: Application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 data:
 *                   $ref: '#/components/schemas/JobApplication'
 *       '400':
 *         description: Validation or business error
 */
// Talent creates an application
router.post("/", authenticate, validate(createApplicationSchema, "body"), createApplication  );

/**
 * @openapi
 * /job-applications/me:
 *   get:
 *     summary: List applications of the authenticated talent
 *     tags:
 *       - Job Applications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobApplication'
 */
// Talent lists own applications
router.get("/me", authenticate, listMyApplications);

/**
 * @openapi
 * /job-applications/job/{jobId}:
 *   get:
 *     summary: List applications for a specific job (company only)
 *     tags:
 *       - Job Applications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: List of applications for the job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/JobApplication'
 *       '400':
 *         description: Not found or unauthorized
 */
// Company lists applications for a specific job they own
router.get(
    "/job/:jobId",
    authenticate,
    validate(jobIdParamSchema, "params"),
    listJobApplicationsForCompany
);

/**
 * @openapi
 * /job-applications/{id}/status:
 *   patch:
 *     summary: Update the status of an application (company only)
 *     tags:
 *       - Job Applications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, interview, accepted, rejected]
 *     responses:
 *       '200':
 *         description: Status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 data:
 *                   $ref: '#/components/schemas/JobApplication'
 *       '400':
 *         description: Validation or authorization error
 */
// Company updates status of an application
router.patch(
    "/:id/status",
    authenticate,
    validate(applicationIdParamSchema, "params"),
    validate(updateStatusSchema, "body"),
    updateApplicationStatus
);

/**
 * @swagger
 * components:
 *   schemas:
 *     JobApplication:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         jobId:
 *           type: string
 *           format: uuid
 *         talentId:
 *           type: string
 *           format: uuid
 *         status:
 *           type: string
 *           enum: [pending, shortlisted, interview, offered, accepted, rejected]
 *         appliedAt:
 *           type: string
 *           format: date-time
 *         additionalInfo:
 *           type: object
 *           nullable: true
 *         resumeUrl:
 *           type: string
 *           format: uri
 *           nullable: true
 *       required:
 *         - id
 *         - jobId
 *         - talentId
 *         - status
 *         - appliedAt
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         status:
 *           type: integer
 *           format: int32
 */

export default router;

