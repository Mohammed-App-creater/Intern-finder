import { Router } from "express";
import { createJobController, getAllJobsController, getJobByIdController, getJobsByCompanyIdController } from "./job.controller";
import { validate } from "../../middlewares/validate";
import { companyIdSchema, createJobSchema, jobIdSchema } from "./job.validation";

const router = Router();

// GET /api/job
/**
 * @openapi
 * /job/:
 *   get:
 *     summary: Get all jobs with optional filters
 *     tags:
 *       - Job
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by job title
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by job location
 *       - in: query
 *         name: categories
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *         description: Filter by categories (multiple allowed)
 *       - in: query
 *         name: minExperienceYears
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Minimum experience required (years)
 *       - in: query
 *         name: datePosted
 *         schema:
 *           type: string
 *           enum: [today, week, month]
 *         description: Filter by date posted
 *       - in: query
 *         name: salaryMin
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Minimum salary filter
 *       - in: query
 *         name: salaryMax
 *         schema:
 *           type: integer
 *           minimum: 0
 *         description: Maximum salary filter
 *       - in: query
 *         name: tags
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *         description: Filter by tags (multiple allowed)
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *                 message:
 *                   type: string
 */
router.get("/", getAllJobsController);



// GET /job/:companyId/jobs
/**
 * @openapi
 * /job/{companyId}/jobs:
 *   get:
 *     summary: Get jobs by company ID
 *     tags:
 *       - Job
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the company
 *     responses:
 *       200:
 *         description: Jobs for the company
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.get("/:companyId/jobs", validate(companyIdSchema, "params"), getJobsByCompanyIdController);

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

router.get("/:jobId", validate(jobIdSchema, "params"), getJobByIdController);


export default router;

