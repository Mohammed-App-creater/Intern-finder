import { Router } from "express";
import { uploadResume } from "./storage.controller";
import { upload } from "@/middlewares/upload";

const router = Router();


router.post("/resume",  upload.single("file"), uploadResume);

export default router;
