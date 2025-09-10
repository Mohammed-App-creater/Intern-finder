import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { RegisterStep1Schema, RegisterStep2Schema, TalentIdSchema, DashboardLimitSchema, UpdateTalentSchema } from "./talent.validation";
import * as talentController from "./talent.controller";
import { TalentLoginSchema } from "./talent.validation";
import { UpdateBasicInfoSchema, UpdateEmailSchema, ChangePasswordSchema, UpdateNotificationSettingsSchema } from "./talent.validation";

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
router.post("/register/step2/:talentId", validate(RegisterStep2Schema, "body"), talentController.registerStep2Handler);

/**
 * @openapi
 * /api/talent/login:
 *   post:
 *     summary: Login Talent
 *     tags:
 *       - Talent
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
 *                 example: johndoe@email.com
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
router.post("/login", validate(TalentLoginSchema, "body"), talentController.loginTalentHandler);

// Dashboard routes
/**
 * @openapi
 * /api/talent/{talentId}:
 *   get:
 *     summary: Get a talent by ID
 *     tags:
 *       - Talent
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: Talent fetched
 *       '404':
 *         description: Talent not found
 *   put:
 *     summary: Update a talent profile
 *     tags:
 *       - Talent
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTalentSchema'
 *     responses:
 *       '200':
 *         description: Talent updated
 *       '400':
 *         description: Validation or update error
 */
router.get("/:talentId", validate(TalentIdSchema, "params"), talentController.getTalentByIdHandler);
router.put("/:talentId", validate(TalentIdSchema, "params"), validate(UpdateTalentSchema, "body"), talentController.updateTalentHandler);

/**
 * @openapi
 * /api/talent/{talentId}/settings/basic-info:
 *   put:
 *     summary: Update basic profile info
 *     tags:
 *       - Talent Settings
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               profileImageUrl:
 *                 type: string
 *                 format: uri
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *     responses:
 *       '200':
 *         description: Basic info updated
 */
router.put(
    "/:talentId/settings/basic-info",
    validate(TalentIdSchema, "params"),
    validate(UpdateBasicInfoSchema, "body"),
    talentController.updateBasicInfoHandler
);

/**
 * @openapi
 * /api/talent/{talentId}/settings/email:
 *   put:
 *     summary: Update login email
 *     tags:
 *       - Talent Settings
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
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
 *     responses:
 *       '200':
 *         description: Email updated
 */
router.put(
    "/:talentId/settings/email",
    validate(TalentIdSchema, "params"),
    validate(UpdateEmailSchema, "body"),
    talentController.updateEmailHandler
);

/**
 * @openapi
 * /api/talent/{talentId}/settings/password:
 *   put:
 *     summary: Change password
 *     tags:
 *       - Talent Settings
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password changed
 */
router.put(
    "/:talentId/settings/password",
    validate(TalentIdSchema, "params"),
    validate(ChangePasswordSchema, "body"),
    talentController.changePasswordHandler
);

/**
 * @openapi
 * /api/talent/{talentId}/settings/notifications:
 *   put:
 *     summary: Update notification settings
 *     tags:
 *       - Talent Settings
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               application:
 *                 type: boolean
 *               job:
 *                 type: boolean
 *               recommendation:
 *                 type: boolean
 *               alert:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Notification settings updated
 */
router.put(
    "/:talentId/settings/notifications",
    validate(TalentIdSchema, "params"),
    validate(UpdateNotificationSettingsSchema, "body"),
    talentController.updateNotificationSettingsHandler
);

/**
 * @openapi
 * /api/talent/{talentId}/dashboard/total-jobs-applied:
 *   get:
 *     summary: Get total jobs applied by talent
 *     tags:
 *       - Talent Dashboard
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Talent ID
 *     responses:
 *       '200':
 *         description: Total jobs applied count
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
 *                     totalJobsApplied:
 *                       type: integer
 *                 error:
 *                   type: null
 */
router.get("/:talentId/dashboard/total-jobs-applied", validate(TalentIdSchema, "params"), talentController.getTotalJobsAppliedHandler);

/**
 * @openapi
 * /api/talent/{talentId}/dashboard/interviewed-count:
 *   get:
 *     summary: Get interviewed count for talent
 *     tags:
 *       - Talent Dashboard
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Talent ID
 *     responses:
 *       '200':
 *         description: Interviewed count
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
 *                     interviewedCount:
 *                       type: integer
 *                 error:
 *                   type: null
 */
router.get("/:talentId/dashboard/interviewed-count", validate(TalentIdSchema, "params"), talentController.getInterviewedCountHandler);

/**
 * @openapi
 * /api/talent/{talentId}/dashboard/job-status:
 *   get:
 *     summary: Get job application status breakdown
 *     tags:
 *       - Talent Dashboard
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Talent ID
 *     responses:
 *       '200':
 *         description: Job application status counts
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
 *                     jobStatusCounts:
 *                       type: object
 *                       properties:
 *                         interviewed:
 *                           type: integer
 *                         rejected:
 *                           type: integer
 *                         pending:
 *                           type: integer
 *                         accepted:
 *                           type: integer
 *                 error:
 *                   type: null
 */
router.get("/:talentId/dashboard/job-status", validate(TalentIdSchema, "params"), talentController.getJobAppliedStatusHandler);

/**
 * @openapi
 * /api/talent/{talentId}/dashboard/upcoming-interviews:
 *   get:
 *     summary: Get upcoming interviews for talent
 *     tags:
 *       - Talent Dashboard
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Talent ID
 *     responses:
 *       '200':
 *         description: Upcoming interviews list
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
 *                     upcomingInterviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           jobTitle:
 *                             type: string
 *                           companyName:
 *                             type: string
 *                           companyLogo:
 *                             type: string
 *                           contactName:
 *                             type: string
 *                           contactJobTitle:
 *                             type: string
 *                           appliedAt:
 *                             type: string
 *                             format: date-time
 *                           jobLocation:
 *                             type: string
 *                           jobEnvironment:
 *                             type: string
 *                 error:
 *                   type: null
 */
router.get("/:talentId/dashboard/upcoming-interviews", validate(TalentIdSchema, "params"), talentController.getUpcomingInterviewsHandler);

/**
 * @openapi
 * /api/talent/{talentId}/dashboard/recent-applications:
 *   get:
 *     summary: Get recent applications history for talent
 *     tags:
 *       - Talent Dashboard
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Talent ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of recent applications to return
 *     responses:
 *       '200':
 *         description: Recent applications history
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
 *                     recentApplications:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           jobTitle:
 *                             type: string
 *                           companyName:
 *                             type: string
 *                           companyLogo:
 *                             type: string
 *                           location:
 *                             type: string
 *                           environmentType:
 *                             type: string
 *                           salaryType:
 *                             type: string
 *                           status:
 *                             type: string
 *                           appliedAt:
 *                             type: string
 *                             format: date-time
 *                 error:
 *                   type: null
 */
router.get("/:talentId/dashboard/recent-applications", validate(TalentIdSchema, "params"), validate(DashboardLimitSchema, "query"), talentController.getRecentApplicationsHistoryHandler);

/**
 * @openapi
 * /api/talent/{talentId}/dashboard/stats:
 *   get:
 *     summary: Get complete dashboard stats for talent
 *     tags:
 *       - Talent Dashboard
 *     parameters:
 *       - in: path
 *         name: talentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Talent ID
 *     responses:
 *       '200':
 *         description: Complete dashboard statistics
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
 *                     totalJobsApplied:
 *                       type: integer
 *                     interviewedCount:
 *                       type: integer
 *                     jobStatusCounts:
 *                       type: object
 *                       properties:
 *                         interviewed:
 *                           type: integer
 *                         rejected:
 *                           type: integer
 *                         pending:
 *                           type: integer
 *                         accepted:
 *                           type: integer
 *                     upcomingInterviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                     recentApplications:
 *                       type: array
 *                       items:
 *                         type: object
 *                 error:
 *                   type: null
 */
router.get("/:talentId/dashboard/stats", validate(TalentIdSchema, "params"), talentController.getTalentDashboardStatsHandler);

export default router;
