import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { RegisterStep1Schema, RegisterStep2Schema } from "./company.validation";
import * as companyController from "./company.controller";

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
router.post("/register/step2", validate(RegisterStep2Schema, "body"), companyController.registerStep2Handler);


router.get("/top", companyController.topCompanyHandler);


export default router; 