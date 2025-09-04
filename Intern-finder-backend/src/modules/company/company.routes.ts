import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { CompanyIdSchema, RegisterStep1Schema, RegisterStep2Schema, GetAllCompaniesSchema } from "./company.validation";
import * as companyController from "./company.controller";
import { CompanyLoginSchema } from "./company.validation";

const router = Router();

/**
 * @openapi
 * /api/company/register/step1:
 *   post:
 *     summary: Register Company - Step 1
 *     tags:
 *       - Company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 minLength: 3
 *                 example: Acme Inc.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: hr@acme.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *             required:
 *               - companyName
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Company registered (step 1)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 companyName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/register/step1", validate(RegisterStep1Schema, "body"), companyController.registerStep1Handler);

/**
 * @openapi
 * /api/company/register/step2:
 *   post:
 *     summary: Register Company - Step 2
 *     tags:
 *       - Company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyId:
 *                 type: string
 *                 example: clwxyz123
 *               linkedinUrl:
 *                 type: string
 *                 example: https://linkedin.com/company/acme
 *               websiteUrl:
 *                 type: string
 *                 example: https://acme.com
 *               githubUrl:
 *                 type: string
 *                 example: https://github.com/acme
 *               foundedAt:
 *                 type: string
 *                 format: date
 *                 example: 2010-05-20
 *               employeeCount:
 *                 type: string
 *                 example: 50-100
 *               locations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["New York", "Remote"]
 *               industries:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Software", "Education"]
 *               logoUrl:
 *                 type: string
 *                 example: https://example.com/logo.png
 *               description:
 *                 type: string
 *                 example: We build next-gen tools.
 *               techStack:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["TypeScript", "Node.js", "PostgreSQL"]
 *               contact:
 *                 type: string
 *                 example: +1 555-123-4567
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/office1.jpg"]
 *               team:
 *                 type: array
 *                 items:
 *                   type: object
 *                 example: [{"name":"Jane","position":"CTO"}]
 *             required:
 *               - companyId
 *               - locations
 *               - industries
 *               - description
 *               - techStack
 *     responses:
 *       '200':
 *         description: Company profile updated (step 2)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/register/step2/:companyId", validate(RegisterStep2Schema, "body"), validate(CompanyIdSchema, "params"), companyController.registerStep2Handler);


router.get("/top", companyController.topCompanyHandler);

/**
 * @openapi
 * /api/company/login:
 *   post:
 *     summary: Login Company
 *     tags:
 *       - Company
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: hr@acme.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 */
router.post("/login", validate(CompanyLoginSchema, "body"), companyController.loginCompanyHandler);

/**
 * @openapi
 * /api/company:
 *   get:
 *     summary: Get all companies with pagination, search and filters
 *     tags:
 *       - Company
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by company name
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location (headQuarter)
 *       - in: query
 *         name: industries
 *         schema:
 *           type: string
 *         description: Comma-separated list of industries to filter by
 *       - in: query
 *         name: teamSize
 *         schema:
 *           type: string
 *         description: Comma-separated list of team sizes to filter by (1-10, 11-50, 51-200, 201-500, 500+)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [companyName, employeeCount, createdAt]
 *           default: createdAt
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       '200':
 *         description: List of companies with pagination
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
 *                     companies:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           companyName:
 *                             type: string
 *                           email:
 *                             type: string
 *                           phone:
 *                             type: string
 *                           linkedinUrl:
 *                             type: string
 *                           instagram:
 *                             type: string
 *                           websiteUrl:
 *                             type: string
 *                           employeeCount:
 *                             type: string
 *                           headQuarter:
 *                             type: string
 *                           branches:
 *                             type: array
 *                             items:
 *                               type: string
 *                           industries:
 *                             type: array
 *                             items:
 *                               type: string
 *                           logoUrl:
 *                             type: string
 *                           description:
 *                             type: string
 *                           techStack:
 *                             type: array
 *                             items:
 *                               type: string
 *                           contactName:
 *                             type: string
 *                           contactEmail:
 *                             type: string
 *                           contactPhone:
 *                             type: string
 *                           contactJobTitle:
 *                             type: string
 *                           teamSize:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                           _count:
 *                             type: object
 *                             properties:
 *                               jobs:
 *                                 type: integer
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *                         totalCount:
 *                           type: integer
 *                         hasNextPage:
 *                           type: boolean
 *                         hasPreviousPage:
 *                           type: boolean
 *                         limit:
 *                           type: integer
 *                 error:
 *                   type: null
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: null
 *                 error:
 *                   type: string
 */
router.get("/", validate(GetAllCompaniesSchema, "query"), companyController.getAllCompanyHandler);

export default router; 