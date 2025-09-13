// companyMember.routes.ts
import { Router } from "express";
import { CompanyMemberController } from "./companyMember.controller";
import * as V from "./companyMember.validation";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorizeCompanyMember, authorizeCompanyAdmin } from "../../middlewares/authorizeCompanyMember";

const router = Router();

/**
 * @openapi
 * /companies/{companyId}/members:
 *   get:
 *     tags:
 *       - CompanyMembers
 *     summary: List company members
 *     description: Returns a paginated list of members for a company. Requires company membership.
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
 *         description: A list of company members
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.get(
  "/companies/:companyId/members",
  authenticate,
  validate(V.paramsCompanyIdSchema, "params"),
  validate(V.listMembersQuery, "query"),
  authorizeCompanyMember,
  CompanyMemberController.listMembers
);

/**
 * @openapi
 * /companies/{companyId}/members:
 *   post:
 *     tags:
 *       - CompanyMembers
 *     summary: Add a company member
 *     description: Company admins can add a talent as a company member.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
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
 *               talentId:
 *                 type: string
 *               role:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *             required:
 *               - talentId
 *     responses:
 *       '201':
 *         description: Member added
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post(
  "/companies/:companyId/members",
  authenticate,
  validate(V.paramsCompanyIdSchema, "params"),
  validate(V.createMemberBody, "body"),
  authorizeCompanyAdmin,
  CompanyMemberController.addMember
);

/**
 * @openapi
 * /talents/{talentId}/availability:
 *   get:
 *     tags:
 *       - CompanyMembers
 *     summary: Get talent availability
 *     description: Returns availability windows for a talent (helpful when scheduling interviews).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       '200':
 *         description: Availability data for the talent
 *       '401':
 *         description: Unauthorized
 */
router.get(
  "/talents/:talentId/availability",
  authenticate,
  validate(V.paramsTalentIdSchema, "params"),
  validate(V.availabilityQuery, "query"),
  CompanyMemberController.getAvailability
);

/**
 * @openapi
 * /companies/{companyId}/interviews/conflicts/check:
 *   post:
 *     tags:
 *       - CompanyMembers
 *     summary: Check interview scheduling conflicts
 *     description: Check whether proposed interview times conflict with existing assignments/availability.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: companyId
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
 *               talentIds:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - startTime
 *               - endTime
 *               - talentIds
 *     responses:
 *       '200':
 *         description: Conflict check result
 *       '400':
 *         description: Validation error
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 */
router.post(
  "/companies/:companyId/interviews/conflicts/check",
  authenticate,
  validate(V.paramsCompanyIdSchema, "params"),
  validate(V.conflictCheckBody, "body"),
  authorizeCompanyMember,
  CompanyMemberController.checkConflicts
);

export default router;
