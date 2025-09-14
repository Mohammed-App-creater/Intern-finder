import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { setupSwagger } from "./config/swagger";
import jobRoutes from "./modules/job/job.routes";
import authRoutes from "./modules/auth/auth.route";
import errorHandler from './middlewares/errorHandler';
import notesRoutes from "./modules/notes/notes.routes";
import talentRoutes from "./modules/talent/talent.routes";
import companyRoutes from "./modules/company/company.routes";
import storageRoutes from "./modules/storage/storage.routes";
import feedbackRoutes from "./modules/feedback/feedback.routes";
import analyticsRoutes from "./modules/analytics/analytics.routes";
import interviewRoutes from "./modules/interviews/interview.routes";
import companyMemberRoutes from "./modules/members/companyMember.routes";
import applicationsRoutes from "./modules/applications/applications.routes";
import notificationRoutes from "./modules/notification/notification.routes";
import jobApplicationRoutes from "./modules/jobApplication/jobAppliccation.routes";



const app = express();



app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupSwagger(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Intern Finder API");
});

app.use("/api/storage", storageRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/talent", talentRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/job-application", jobApplicationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/", interviewRoutes);
app.use("/api/", companyMemberRoutes);
app.use("/api/", feedbackRoutes);
app.use("/api/", notesRoutes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ ok: true });
});



app.use(errorHandler);

export default app;
