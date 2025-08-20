import { Request, Response } from "express";
import { uploadFile } from "./storage.service";

export const uploadResume = async (req: Request, res: Response) => {
  try {
    console.log("Received file:", req.get('Content-Type'));
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const fileKey = `resumes/${Date.now()}-${req.file.originalname}`;
    const url = await uploadFile(fileKey, req.file.buffer, req.file.mimetype);

    res.status(201).json({ url });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
    