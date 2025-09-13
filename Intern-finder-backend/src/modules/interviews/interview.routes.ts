// File: interview.routes.ts
import { Router } from "express";
import { InterviewController } from "./interview.controller";
import * as V from "./interview.validation";
import { validate } from "../../middlewares/validate"; // your validate util
import { authenticate } from "../../middlewares/auth.middleware";
import { authorizeCompanyMember } from "../../middlewares/authorizeCompanyMember";

const router = Router();

/**
 * @openapi
 * /companies/{companyId}/applications/{applicationId}/interviews:
 *   get:
 *     tags:
 *       - Interviews
 *     summary: Get interviews for a job application
 *     description: Returns interviews associated with a specific job application.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A list of interviews for the application
 *       '401':
 *         description: Unauthorized
 */
router.get(
  "/companies/:companyId/applications/:applicationId/interviews",
  authenticate,
  validate(V.paramsCompanyAppSchema, "params"),
  validate(V.interviewQueryFilters, "query"),
  InterviewController.getByApplication
);

/**
 * @openapi
 * /companies/{companyId}/interviews:
 *   get:
 *     tags:
 *       - Interviews
 *     summary: Get interviews for a company
 *     description: Returns interviews across the company. Company members get full details.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Company interviews list
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.get(
  "/companies/:companyId/interviews",
  authenticate,
  validate(V.paramsCompanyIdSchema, "params"),
  validate(V.interviewQueryFilters, "query"),
  authorizeCompanyMember,
  InterviewController.getCompanyInterviews
);

/**
 * @openapi
 * /companies/{companyId}/applications/{applicationId}/interviews:
 *   post:
 *     tags:
 *       - Interviews
 *     summary: Create an interview for an application
 *     description: Company members can schedule/create an interview for a candidate's application.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: applicationId
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
 *               type:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               locationDetails:
 *                 type: string
 *             required:
 *               - type
 *               - startTime
 *               - endTime
 *     responses:
 *       '201':
 *         description: Interview created
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post(
  "/companies/:companyId/applications/:applicationId/interviews",
  authenticate,
  authorizeCompanyMember,
  validate(V.paramsCompanyAppSchema, "params"),
  validate(V.createInterviewBody, "body"),
  InterviewController.createInterview
);

/**
 * @openapi
 * /companies/{companyId}/interviews/{interviewId}:
 *   patch:
 *     tags:
 *       - Interviews
 *     summary: Update an interview
 *     description: Update interview details (time, location, etc.).
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
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               locationDetails:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Interview updated successfully
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.patch(
  "/companies/:companyId/interviews/:interviewId",
  authenticate,
  authorizeCompanyMember,
  validate(V.paramsCompanyInterviewSchema, "params"),
  validate(V.updateInterviewBody, "body"),
  InterviewController.updateInterview
);

/**
 * @openapi
 * /companies/{companyId}/interviews/{interviewId}/status:
 *   patch:
 *     tags:
 *       - Interviews
 *     summary: Update interview status
 *     description: Update the status of an interview (e.g., SCHEDULED, COMPLETED).
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
 *               status:
 *                 type: string
 *             required:
 *               - status
 *     responses:
 *       '200':
 *         description: Status updated
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.patch(
  "/companies/:companyId/interviews/:interviewId/status",
  authenticate,
  authorizeCompanyMember,
  validate(V.paramsCompanyInterviewSchema, "params"),
  validate(V.statusUpdateBody, "body"),
  InterviewController.updateStatus
);

/**
 * @openapi
 * /companies/{companyId}/interviews/{interviewId}:
 *   delete:
 *     tags:
 *       - Interviews
 *     summary: Delete (soft) an interview
 *     description: Soft-delete an interview so it is no longer active.
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
 *       '204':
 *         description: Interview deleted (no content)
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.delete(
  "/companies/:companyId/interviews/:interviewId",
  authenticate,
  authorizeCompanyMember,
  validate(V.paramsCompanyInterviewSchema, "params"),
  InterviewController.deleteInterview
);

/**
 * @openapi
 * /companies/{companyId}/interviews/{interviewId}/assignments:
 *   post:
 *     tags:
 *       - Interviews
 *     summary: Add interviewer assignments in bulk
 *     description: Assign multiple talents as interviewers for an interview.
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
 *               talentIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - talentIds
 *     responses:
 *       '200':
 *         description: Assignments added
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post(
  "/companies/:companyId/interviews/:interviewId/assignments",
  authenticate,
  authorizeCompanyMember,
  validate(V.paramsCompanyInterviewSchema, "params"),
  validate(V.bulkAssignmentsBody, "body"),
  InterviewController.addAssignments
);

/**
 * @openapi
 * /companies/{companyId}/interviews/{interviewId}/assignments/{talentId}:
 *   delete:
 *     tags:
 *       - Interviews
 *     summary: Remove an interviewer assignment
 *     description: Remove a specific talent from an interview's assignments.
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
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Assignment removed (no content)
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.delete(
  "/companies/:companyId/interviews/:interviewId/assignments/:talentId",
  authenticate,
  authorizeCompanyMember,
  validate(V.deleteAssignmentParams, "params"),
  InterviewController.removeAssignment
);

export default router;
