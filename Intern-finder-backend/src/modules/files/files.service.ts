import prisma from "../../utils/prisma";
import { v4 as uuidv4 } from "uuid";

export class FilesService {
  static async assertApplicationAccess(companyId: string, applicationId: string, user: any): Promise<void> {
    // Company member
    if (user?.companyMember && user?.companyId === companyId) return;
    
    // Talent owner
    if (user?.talentId) {
      const app = await prisma.jobApplication.findFirst({
        where: { id: applicationId, talentId: user.talentId },
        select: { id: true },
      });
      if (app) return;
    }

    const err = new Error("Forbidden");
    (err as any).code = 403;
    throw err;
  }

  static async uploadApplicationFile(
    companyId: string,
    applicationId: string,
    user: any,
    file: any,
    payload: { fileType: string; description?: string }
  ) {
    await this.assertApplicationAccess(companyId, applicationId, user);

    // Verify application exists and is accessible
    const application = await prisma.jobApplication.findFirst({
      where: { id: applicationId },
      select: { id: true, talentId: true, job: { select: { companyId: true } } },
    });

    if (!application) {
      const err = new Error("Application not found");
      (err as any).code = 404;
      throw err;
    }

    // Check access again with verified data
    const hasAccess = 
      (user?.companyMember && user?.companyId === application.job.companyId) ||
      (user?.talentId === application.talentId);

    if (!hasAccess) {
      const err = new Error("Forbidden");
      (err as any).code = 403;
      throw err;
    }

    const fileId = uuidv4();
    const fileName = `${fileId}_${file.originalname}`;
    
    // In a real implementation, you would upload to cloud storage here
    const fileUrl = `/files/${fileName}`;

    // Store file metadata in database
    const fileRecord = await prisma.interviewNote.create({
      data: {
        applicationId,
        authorTalentId: user.talentId,
        content: JSON.stringify({
          fileId,
          fileName: file.originalname,
          fileUrl,
          fileType: payload.fileType,
          description: payload.description,
          mimeType: file.mimetype,
          size: file.size,
        }),
        isPrivate: true,
      },
      select: { id: true },
    });

    return {
      fileId,
      fileName: file.originalname,
      fileUrl,
      fileType: payload.fileType,
      description: payload.description,
    };
  }

  static async getFile(fileId: string, user: any) {
    // Find file metadata
    const fileNote = await prisma.interviewNote.findFirst({
      where: {
        content: { contains: fileId },
      },
      include: {
        application: {
          select: {
            talentId: true,
            job: { select: { companyId: true } },
          },
        },
      },
    });

    if (!fileNote) {
      const err = new Error("File not found");
      (err as any).code = 404;
      throw err;
    }

    // Check access
    const hasAccess = 
      (user?.companyMember && user?.companyId === fileNote.application.job.companyId) ||
      (user?.talentId === fileNote.application.talentId);

    if (!hasAccess) {
      const err = new Error("Forbidden");
      (err as any).code = 403;
      throw err;
    }

    const fileData = JSON.parse(fileNote.content);
    return {
      fileId: fileData.fileId,
      fileName: fileData.fileName,
      fileUrl: fileData.fileUrl,
      fileType: fileData.fileType,
      description: fileData.description,
      mimeType: fileData.mimeType,
      size: fileData.size,
    };
  }
}
