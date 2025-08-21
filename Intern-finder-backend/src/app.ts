import express, { Request, Response } from "express";
import cors from "cors";
import storageRoutes from "./modules/storage/storage.routes";
import { setupSwagger } from "./config/swagger";
import errorHandler from '@/middlewares/errorHandler';



const app = express();



app.use(cors());
app.use(express.json());
setupSwagger(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Intern Finder API");
});

app.use("/api/storage", storageRoutes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ ok: true });
});



app.use(errorHandler);

export default app;
