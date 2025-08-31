import express, { Request, Response } from "express";
import cors from "cors";
import { setupSwagger } from "./config/swagger";
import errorHandler from '@/middlewares/errorHandler';
import storageRoutes from "./modules/storage/storage.routes";
import talentRoutes from "./modules/talent/talent.routes";
import companyRoutes from "./modules/company/company.routes";
import jobRoutes from "./modules/job/job.routes";
import analyticsRoutes from "./modules/analytics/analytics.routes";



const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupSwagger(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Intern Finder API");
});

app.use("/api/storage", storageRoutes);
app.use("/api/talent", talentRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/analytics", analyticsRoutes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ ok: true });
});



app.use(errorHandler);

export default app;
