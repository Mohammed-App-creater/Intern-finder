// src/modules/notes/notes.service.ts
import prisma  from "../../utils/prisma";

export class NotesService {
  static async createNote(companyId: string, interviewId: string, data: {
    authorTalentId: string;
    content: string;
    isPrivate: boolean;
    parentId?: string;
  }) {
    // ✅ Validate author is a company member
    const member = await prisma.companyMember.findUnique({
      where: { companyId_talentId: { companyId, talentId: data.authorTalentId } },
    });
    if (!member) throw new Error("Author is not a company member");

    // ✅ Validate parent note (if any)
    if (data.parentId) {
      const parent = await prisma.interviewNote.findUnique({
        where: { id: data.parentId },
      });
      if (!parent) throw new Error("Parent note not found");
    }

    // ✅ Create note
    return prisma.interviewNote.create({
      data: {
        interviewId,
        authorTalentId: data.authorTalentId,
        content: data.content,
        isPrivate: data.isPrivate,
        parentId: data.parentId,
      },
    });
  }

  static async listNotes(companyId: string, interviewId: string, isCandidate: boolean) {
    const notes = await prisma.interviewNote.findMany({
      where: {
        interviewId,
        ...(isCandidate ? { isPrivate: false } : {}), // filter for candidates
      },
      include: {
        authorTalent: {
          select: { id: true, fullName: true, profileImageUrl: true },
        },
        replies: {
          select: { id: true }, // just count
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return notes.map(n => ({
      ...n,
      repliesCount: n.replies.length,
    }));
  }

  static async createReply(companyId: string, applicationId: string, noteId: string, data: {
    authorTalentId: string;
    content: string;
  }) {
    // ✅ Validate author is a company member
    const member = await prisma.companyMember.findUnique({
      where: { companyId_talentId: { companyId, talentId: data.authorTalentId } },
    });
    if (!member) throw new Error("Author is not a company member");

    // ✅ Validate parent note belongs to same application
    const parent = await prisma.interviewNote.findUnique({
      where: { id: noteId },
      include: { interview: true },
    });
    if (!parent) throw new Error("Parent note not found");
    if (!parent.interview || parent.interview.applicationId !== applicationId) {
      throw new Error("Note does not belong to this application");
    }

    return prisma.interviewNote.create({
      data: {
        interviewId: parent.interviewId,
        applicationId,
        authorTalentId: data.authorTalentId,
        content: data.content,
        isPrivate: parent.isPrivate, // inherit visibility
        parentId: noteId,
      },
    });
  }
}
