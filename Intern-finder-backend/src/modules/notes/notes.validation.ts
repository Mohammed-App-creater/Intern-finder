import { z } from "zod";

export const createNoteSchema = z.object({
    companyId: z.uuid(),
    interviewId: z.uuid(),
});

export const createNoteBodySchema = z.object({
    authorTalentId: z.uuid(),
    content: z.string().min(1).max(2000),
    isPrivate: z.boolean(),
    parentId: z.uuid().optional(),
}); 

export const listNotesSchema = z.object({
    companyId: z.uuid(),
    interviewId: z.uuid(),
});

export const listNotesQuerySchema = z.object({
    includePrivate: z.boolean().optional(), // company members only
});

export const createReplySchema = z.object({
    companyId: z.uuid(),
    applicationId: z.uuid(),
    noteId: z.uuid(),
});

export const createReplyBodySchema = z.object({
    authorTalentId: z.uuid(),
    content: z.string().min(1).max(1000),
});