import { Router } from "express";
import { NotesController } from "./notes.controller";
import { validate } from "../../middlewares/validate";
import { authorizeCompanyMember } from "../../middlewares/authorizeCompanyMember";
import { createNoteSchema, listNotesSchema, createReplySchema, listNotesQuerySchema, createNoteBodySchema, createReplyBodySchema } from "./notes.validation";

const router = Router();

/**
 * @openapi
 * /companies/{companyId}/interviews/{interviewId}/notes:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Create a note for an interview
 *     description: Company members can create an internal note attached to an interview.
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
 *               content:
 *                 type: string
 *                 description: Note content
 *               isPrivate:
 *                 type: boolean
 *                 description: Whether the note is private to company members
 *             required:
 *               - content
 *     responses:
 *       '201':
 *         description: Note created successfully
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post(
    "/companies/:companyId/interviews/:interviewId/notes",
    authorizeCompanyMember,
    validate(createNoteSchema, "params"),
    validate(createNoteBodySchema, "body"),
    NotesController.createNote
);

/**
 * @openapi
 * /companies/{companyId}/interviews/{interviewId}/notes:
 *   get:
 *     tags:
 *       - Notes
 *     summary: List notes for an interview
 *     description: Returns notes attached to a specific interview. Company members receive full details.
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
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Results per page
 *     responses:
 *       '200':
 *         description: A list of notes
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.get(
    "/companies/:companyId/interviews/:interviewId/notes",
    validate(listNotesSchema, "params"),
    validate(listNotesQuerySchema, "query"),
    NotesController.listNotes
);

/**
 * @openapi
 * /companies/{companyId}/applications/{applicationId}/notes/{noteId}/replies:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Create a reply to a note
 *     description: Company members can reply to an existing note attached to an application.
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
 *       - in: path
 *         name: noteId
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
 *               content:
 *                 type: string
 *                 description: Reply content
 *             required:
 *               - content
 *     responses:
 *       '201':
 *         description: Reply created successfully
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post(
    "/companies/:companyId/applications/:applicationId/notes/:noteId/replies",
    authorizeCompanyMember,
    validate(createReplySchema, "params"),
    validate(createReplyBodySchema, "body"),
    NotesController.createReply
);

export default router;
