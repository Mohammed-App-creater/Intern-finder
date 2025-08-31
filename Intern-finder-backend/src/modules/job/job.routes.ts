import { Router } from "express";
import {  createJobController } from "./job.controller";
import { validate } from "@/middlewares/validate";
import { companyIdSchema, createJobSchema } from "./job.validation";

const router = Router();

// POST /companies/:companyId/create
/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Frontend Intern
 *         environmentType:
 *           type: string
 *           example: Remote
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Engineering", "Internship"]
 *         salaryType:
 *           type: string
 *           enum: [free, paid]
 *           example: paid
 *         salaryRange:
 *           type: string
 *           example: "$0 - $500"
 *         responsibilities:
 *           type: string
 *         description:
 *           type: string
 *           example: "Work on frontend features and UI improvements"
 *         professionalSkills:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         minExperienceYears:
 *           type: integer
 *           minimum: 0
 *         degree:
 *           type: string
 *         location:
 *           type: string
 *           example: "New York, NY"
 *         status:
 *           type: string
 *           enum: [live, closed]
 *           example: live
 *         capacity:
 *           type: integer
 *         requiredSkills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["JavaScript", "React"]
 *       required:
 *         - title
 *         - environmentType
 *         - categories
 *         - salaryType
 *         - description
 *         - location
 *         - requiredSkills
 */
/**
 * @swagger
 * /companies/{companyId}/create:
 *   post:
 *     summary: Create a job for a company
 *     tags:
 *       - Job
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         description: The ID of the company
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post("/:companyId/create", validate(companyIdSchema, "params"), validate(createJobSchema, "body"), createJobController);

export default router;
