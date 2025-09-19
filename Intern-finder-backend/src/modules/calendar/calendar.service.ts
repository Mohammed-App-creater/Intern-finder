import prisma from "../../utils/prisma";

export class CalendarService {
  static async assertCompanyMember(companyId: string, user: any): Promise<void> {
    if (!user || !user.companyMember || user.companyId !== companyId) {
      const err = new Error("Forbidden");
      (err as any).code = 403;
      throw err;
    }
  }

  static async assertInterviewOwnedByCompany(companyId: string, interviewId: string): Promise<void> {
    const interview = await prisma.interview.findFirst({
      where: { id: interviewId, companyId },
      select: { id: true },
    });
    if (!interview) {
      const err = new Error("Interview not found or not owned by company");
      (err as any).code = 404;
      throw err;
    }
  }

  static async syncCalendarEvent(
    companyId: string,
    interviewId: string,
    user: any,
    payload: { provider: string; providerToken: string; eventPayload: any }
  ) {
    await this.assertCompanyMember(companyId, user);
    await this.assertInterviewOwnedByCompany(companyId, interviewId);

    // In a real implementation, you would integrate with Google/Outlook APIs here
    const externalEventId = `ext_${interviewId}_${Date.now()}`;

    // Update interview with external calendar event ID
    await prisma.interview.update({
      where: { id: interviewId },
      data: { externalCalendarEventId: externalEventId },
    });

    // Store sync details as a note
    await prisma.interviewNote.create({
      data: {
        interviewId,
        authorTalentId: user.talentId,
        content: JSON.stringify({
          type: "CALENDAR_SYNC",
          provider: payload.provider,
          externalEventId,
          syncedAt: new Date(),
        }),
        isPrivate: true,
      },
    });

    return {
      externalEventId,
      provider: payload.provider,
      synced: true,
    };
  }

  static async deleteCalendarEvent(
    companyId: string,
    interviewId: string,
    user: any,
    payload: { reason: string }
  ) {
    await this.assertCompanyMember(companyId, user);
    await this.assertInterviewOwnedByCompany(companyId, interviewId);

    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
      select: { externalCalendarEventId: true },
    });

    if (!interview?.externalCalendarEventId) {
      const err = new Error("No external calendar event found for this interview");
      (err as any).code = 404;
      throw err;
    }

    // In a real implementation, you would delete from external calendar here
    // For now, just clear the external event ID
    await prisma.interview.update({
      where: { id: interviewId },
      data: { externalCalendarEventId: null },
    });

    // Store deletion reason as a note
    await prisma.interviewNote.create({
      data: {
        interviewId,
        authorTalentId: user.talentId,
        content: JSON.stringify({
          type: "CALENDAR_DELETE",
          reason: payload.reason,
          deletedAt: new Date(),
        }),
        isPrivate: true,
      },
    });

    return {
      deleted: true,
      reason: payload.reason,
    };
  }
}
