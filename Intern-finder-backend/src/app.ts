import express, { Request, Response } from "express";
import cors from "cors";
import storageRoutes from "./modules/storage/storage.routes";



const app = express();



app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Intern Finder API");
});

app.use("/api/storage", storageRoutes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ ok: true });
});


export default app;
