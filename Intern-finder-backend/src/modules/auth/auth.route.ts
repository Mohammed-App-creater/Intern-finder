import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { LoginSchema } from "./auth.company.validation";
import { github, githubCallbackController, google, googleCallbackController, loginController, getMe } from "./auth.controller";
import { authenticate } from "../../middlewares/auth.middleware";



const router = Router();


/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login (talent or company)
 *     tags:
 *       - Auth
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
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       '400':
 *         description: Invalid credentials
 */
router.post("/login", validate(LoginSchema), loginController);


// Redirect to provider
router.get("/google", google);

router.get("/github", github);

// Callback handlers
router.get("/google/callback", googleCallbackController);

router.get("/github/callback", githubCallbackController);

router.get("/me", authenticate, getMe);


export default router;