import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate";
import { ApplicationController } from "./applications.controller";
import { uuidParamSchema, listApplicationsQuerySchema, applicationIdParamSchema, updateStageBodySchema, addNoteBodySchema, getNotesQuerySchema } from "./applications.validation";

const router = Router();

/**
 * @openapi
 * /applications/companies/{companyId}/applications:
 *   get:
 *     tags:
 *       - Applications
 *     summary: List job applications for a company
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: companyId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: jobId
 *         in: query
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: stage
 *         in: query
 *         schema:
 *           type: string
 *           enum: [pending, shortlisted, interview, offered, accepted, rejected]
 *       - name: q
 *         in: query
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 20
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *           enum: [appliedAt, stage]
 *       - name: order
 *         in: query
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Paginated list of applications
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicationsListResponse'
 *       400:
 *         description: Bad request
 */
router.get(
    "/companies/:companyId/applications",
    authenticate,
    validate(uuidParamSchema, "params"),
    validate(listApplicationsQuerySchema, "query"),
    ApplicationController.listForCompany
);

/**
 * @openapi
 * /applications/companies/{companyId}/applications/{applicationId}:
 *   get:
 *     tags:
 *       - Applications
 *     summary: Get details for a single application
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: companyId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: applicationId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Application details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicationDetails'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.get(
    "/companies/:companyId/applications/:applicationId",
    authenticate,
    validate(applicationIdParamSchema, "params"),
    ApplicationController.getDetails
);

/**
 * @openapi
 * /applications/companies/{companyId}/applications/{applicationId}/stage:
 *   patch:
 *     tags:
 *       - Applications
 *     summary: Update application stage/status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: companyId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: applicationId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateApplicationStageRequest'
 *     responses:
 *       200:
 *         description: Updated application object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JobApplication'
 *       400:
 *         description: Bad request
 *       403:
 *         description: Forbidden
 */
router.patch(
    "/companies/:companyId/applications/:applicationId/stage",
    authenticate,
    validate(applicationIdParamSchema, "params"),
    validate(updateStageBodySchema, "body"),
    ApplicationController.updateStage
);

/**
 * @openapi
 * /applications/companies/{companyId}/applications/{applicationId}/notes:
 *   post:
 *     tags:
 *       - Applications
 *     summary: Add a note to an application (company members only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: companyId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: applicationId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddApplicationNoteRequest'
 *     responses:
 *       201:
 *         description: Created note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterviewNote'
 *       400:
 *         description: Bad request
 *       403:
 *         description: Forbidden
 */
router.post(
    "/companies/:companyId/applications/:applicationId/notes",
    authenticate,
    validate(applicationIdParamSchema, "params"),
    validate(addNoteBodySchema, "body"),
    ApplicationController.addNote
);

/**
 * @openapi
 * /applications/companies/{companyId}/applications/{applicationId}/notes:
 *   get:
 *     tags:
 *       - Applications
 *     summary: List notes for an application
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: companyId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: applicationId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: onlyPublic
 *         in: query
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: List of notes (threaded)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotesListResponse'
 *       400:
 *         description: Bad request
 */
router.get(
    "/companies/:companyId/applications/:applicationId/notes",
    authenticate,
    validate(applicationIdParamSchema, "params"),
    validate(getNotesQuerySchema, "query"),
    ApplicationController.listNotes
);

export default router; 