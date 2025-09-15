import { Request, Response } from "express";
import { NotesService } from "./notes.service";

export class NotesController {
  static async createNote(req: Request, res: Response) {
    const { companyId, interviewId } = req.params;
    const { authorTalentId, content, isPrivate, parentId } = req.body;

    try {
      const note = await NotesService.createNote(companyId, interviewId, {
        authorTalentId, content, isPrivate, parentId,
      });
      res.status(201).json(note);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async listNotes(req: Request, res: Response) {
    const { companyId, interviewId } = req.params;
    const isCandidate = req.user?.role === "TALENT"; // from auth middleware

    try {
      const notes = await NotesService.listNotes(companyId, interviewId, isCandidate);
      res.json(notes);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async createReply(req: Request, res: Response) {
    const { companyId, applicationId, noteId } = req.params;
    const { authorTalentId, content } = req.body;

    try {
      const reply = await NotesService.createReply(companyId, applicationId, noteId, {
        authorTalentId, content,
      });
      res.status(201).json(reply);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
