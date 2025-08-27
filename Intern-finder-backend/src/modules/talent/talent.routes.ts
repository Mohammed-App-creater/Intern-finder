import { Router } from "express";
import { validate } from "@/middlewares/validate";
import { RegisterStep1Schema, RegisterStep2Schema } from "./talent.validation";
import * as talentController from "./talent.controller";

const router = Router();

/**
 * @openapi
 * /api/talent/register/step1:
 *   post:
 *     summary: Register Talent - Step 1
 *     tags:
 *       - Talent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 minLength: 3
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@email.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *             required:
 *               - fullName
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Talent registered (step 1)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 fullName:
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
router.post("/register/step1", validate(RegisterStep1Schema, "body"), talentController.registerStep1Handler);
/**
 * @openapi
 * /api/talent/register/step2:
 *   post:
 *     summary: Register Talent - Step 2
 *     tags:
 *       - Talent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               talentId:
 *                 type: string
 *                 example: clwxyz123
 *               location:
 *                 type: string
 *                 example: New York
 *               phoneNumber:
 *                 type: string
 *                 example: '1234567890'
 *               institution:
 *                 type: string
 *                 example: MIT
 *               fieldOfStudy:
 *                 type: string
 *                 example: Computer Science
 *               program:
 *                 type: string
 *                 example: Bachelor
 *               workingEnvironment:
 *                 type: string
 *                 example: Remote
 *               preferredRole:
 *                 type: string
 *                 example: Frontend Developer
 *               linkedinUrl:
 *                 type: string
 *                 example: https://linkedin.com/in/johndoe
 *               bio:
 *                 type: string
 *                 example: Aspiring developer...
 *               profileImageUrl:
 *                 type: string
 *                 example: https://example.com/image.jpg
 *               resumeUrl:
 *                 type: string
 *                 example: https://example.com/resume.pdf
 *             required:
 *               - talentId
 *               - location
 *               - phoneNumber
 *               - institution
 *               - fieldOfStudy
 *               - program
 *               - workingEnvironment
 *               - preferredRole
 *               - linkedinUrl
 *               - bio
 *     responses:
 *       '200':
 *         description: Talent profile updated (step 2)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 # Add other fields as returned by your service
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
router.post("/register/step2", validate(RegisterStep2Schema, "body"), talentController.registerStep2Handler);

export default router;
