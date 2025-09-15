import { PrismaClient } from "@prisma/client";
import { BadRequestError, NotFoundError, ForbiddenError } from "../../utils/errors";

const prisma = new PrismaClient();

export class InterviewService {
  static async fetchInterviewsForApplication({ companyId, applicationId, userId, filters }: any) {
    // ownership and access checks
    const app = await prisma.jobApplication.findUnique({ where: { id: applicationId }, include: { job: true } });
    if (!app || app.job.companyId !== companyId) throw new NotFoundError("Application not found");

    // allow either company member or the candidate owner
    const isCandidateOwner = app.talentId === userId;
    const isCompanyMember = await prisma.companyMember.findFirst({ where: { companyId, talentId: userId, active: true } });
    if (!isCandidateOwner && !isCompanyMember) throw new ForbiddenError();

    const where: any = { applicationId };
    if (filters?.status) where.status = filters.status;
    if (filters?.type) where.type = filters.type;
    if (filters?.from || filters?.to) {
      where.AND = [];
      if (filters.from) where.AND.push({ endTime: { gte: new Date(filters.from) } });
      if (filters.to) where.AND.push({ startTime: { lte: new Date(filters.to) } });
    }

    const interviews = await prisma.interview.findMany({
      where,
      orderBy: { startTime: "asc" },
      include: { interviewers: { include: { talent: { select: { id: true, fullName: true, profileImageUrl: true } } } } },
    });

    return interviews.map((i) => ({
      id: i.id,
      type: i.type,
      status: i.status,
      startTime: i.startTime,
      endTime: i.endTime,
      locationType: i.locationType,
      locationDetails: i.locationDetails,
      interviewers: i.interviewers.map((a) => ({ id: a.talent.id, fullName: a.talent.fullName, profileImageUrl: a.talent.profileImageUrl })),
    }));
  }

  static async fetchCompanyInterviews({ companyId, userId, filters }: any) {
    // only company members
    const member = await prisma.companyMember.findFirst({ where: { companyId, talentId: userId, active: true } });
    if (!member) throw new ForbiddenError();

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const where: any = { companyId };
    if (filters.jobId) where.application = { some: { jobId: filters.jobId } };
    if (filters.interviewerId) where.interviewers = { some: { talentId: filters.interviewerId } };
    if (filters.status) where.status = filters.status;
    if (filters.from || filters.to) {
      where.AND = [];
      if (filters.from) where.AND.push({ endTime: { gte: new Date(filters.from) } });
      if (filters.to) where.AND.push({ startTime: { lte: new Date(filters.to) } });
    }

    const [items, total] = await Promise.all([
      prisma.interview.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { startTime: "asc" },
        include: { interviewers: { include: { talent: { select: { id: true, fullName: true, profileImageUrl: true } } } }, application: { include: { job: { select: { id: true, title: true } }, talent: { select: { id: true, fullName: true } } } } },
      }),
      prisma.interview.count({ where }),
    ]);

    const data = items.map((i) => ({
      id: i.id,
      type: i.type,
      status: i.status,
      startTime: i.startTime,
      endTime: i.endTime,
      locationType: i.locationType,
      locationDetails: i.locationDetails,
      interviewers: i.interviewers.map((a) => ({ id: a.talent.id, fullName: a.talent.fullName, profileImageUrl: a.talent.profileImageUrl })),
      job: i.application?.job ? { id: i.application.job.id, title: i.application.job.title } : undefined,
      candidate: i.application?.talent ? { id: i.application.talent.id, fullName: i.application.talent.fullName } : undefined,
    }));

    return { data, meta: { total, page, limit } };
  }

  static async createInterview({ companyId, applicationId, payload, createdById }: any) {
    // verify application ownership
    const app = await prisma.jobApplication.findUnique({ where: { id: applicationId }, include: { job: true } });
    if (!app || app.job.companyId !== companyId) throw new NotFoundError("Application or Job not found for company");

    // only company members
    const creatorMember = await prisma.companyMember.findFirst({ where: { companyId, talentId: createdById, active: true } });
    if (!creatorMember) throw new ForbiddenError();

    // verify interviewers are company members
    const members = await prisma.companyMember.findMany({ where: { companyId, talentId: { in: payload.interviewerTalentIds }, active: true } });
    if (members.length !== payload.interviewerTalentIds.length) throw new BadRequestError("One or more interviewers are not company members");

    // conflict detection for candidate and interviewers
    const start = new Date(payload.startTime);
    const end = new Date(payload.endTime);
    if (start >= end) throw new BadRequestError("startTime must be before endTime");

    // candidate conflicts
    const candidateConflicts = await prisma.interview.findFirst({ where: { applicationId, AND: [ { startTime: { lt: end } }, { endTime: { gt: start } } ] } });
    if (candidateConflicts) throw new BadRequestError("Candidate has a conflicting interview");

    // interviewer conflicts
    const interviewerConflicts = await prisma.interview.findFirst({ where: { interviewers: { some: { talentId: { in: payload.interviewerTalentIds } } }, AND: [ { startTime: { lt: end } }, { endTime: { gt: start } } ] } });
    if (interviewerConflicts) throw new BadRequestError("One or more interviewers have conflicting interviews");

    // create interview + assignments in transaction
    const result = await prisma.$transaction(async (tx) => {
      const interview = await tx.interview.create({
        data: {
          companyId,
          applicationId,
          type: payload.type as any,
          status: "SCHEDULED",
          startTime: start,
          endTime: end,
          timezone: payload.timezone,
          locationType: payload.locationType,
          locationDetails: payload.locationDetails,
          createdByCompanyId: companyId,
        },
      });

      const assignmentCreates = payload.interviewerTalentIds.map((talentId: string) => tx.interviewerAssignment.create({ data: { interviewId: interview.id, talentId } }));
      await Promise.all(assignmentCreates);

      if (payload.moveApplicationToStage) {
        await tx.jobApplication.update({ where: { id: applicationId }, data: { /* example: move stage - depends on schema */ } }).catch(() => {});
      }

      // optionally: create InterviewNote audit
      await tx.interviewNote.create({ data: { interviewId: interview.id, content: `Interview scheduled by ${createdById}`, isPrivate: true, authorTalentId: createdById } });

      return interview;
    });

    // TODO: trigger notifications / calendar events if payload.notifyInterviewer

    return {
      id: result.id,
      type: result.type,
      status: result.status,
      startTime: result.startTime,
      endTime: result.endTime,
      locationType: result.locationType,
      locationDetails: result.locationDetails,
    };
  }

  static async updateInterview({ companyId, interviewId, payload, updatedById }: any) {
    const interview = await prisma.interview.findUnique({ where: { id: interviewId }, include: { interviewers: true, application: { include: { job: true } } } });
    if (!interview || interview.companyId !== companyId) throw new NotFoundError("Interview not found");

    const member = await prisma.companyMember.findFirst({ where: { companyId, talentId: updatedById, active: true } });
    if (!member) throw new ForbiddenError();

    const toUpdate: any = {};
    if (payload.startTime) toUpdate.startTime = new Date(payload.startTime);
    if (payload.endTime) toUpdate.endTime = new Date(payload.endTime);
    if (payload.timezone) toUpdate.timezone = payload.timezone;
    if (payload.locationType) toUpdate.locationType = payload.locationType;
    if (payload.locationDetails) toUpdate.locationDetails = payload.locationDetails;
    if (payload.type) toUpdate.type = payload.type;

    // If time changed, check conflicts
    const start = toUpdate.startTime ?? interview.startTime;
    const end = toUpdate.endTime ?? interview.endTime;
    if (start >= end) throw new BadRequestError("startTime must be before endTime");

    const candidateConflict = await prisma.interview.findFirst({ where: { applicationId: interview.applicationId, id: { not: interviewId }, AND: [ { startTime: { lt: end } }, { endTime: { gt: start } } ] } });
    if (candidateConflict) throw new BadRequestError("Candidate has a conflicting interview");

    // interviewer conflict checks (if interviewer list changed or time changed)
    if (payload.interviewerTalentIds || toUpdate.startTime || toUpdate.endTime) {
      const newInterviewerIds = payload.interviewerTalentIds ?? interview.interviewers.map((it) => it.talentId);
      const conflict = await prisma.interview.findFirst({ where: { id: { not: interviewId }, interviewers: { some: { talentId: { in: newInterviewerIds } } }, AND: [ { startTime: { lt: end } }, { endTime: { gt: start } } ] } });
      if (conflict) throw new BadRequestError("One or more interviewers have conflicting interviews");
    }

    const updated = await prisma.$transaction(async (tx) => {
      const u = await tx.interview.update({ where: { id: interviewId }, data: toUpdate });

      if (payload.interviewerTalentIds) {
        // sync assignments: remove existing not in new list, add missing
        const existing = await tx.interviewerAssignment.findMany({ where: { interviewId } });
        const existingIds = existing.map((e) => e.talentId);
        const toRemove = existing.filter((e) => !payload.interviewerTalentIds.includes(e.talentId));
        const toAdd = payload.interviewerTalentIds.filter((id: string) => !existingIds.includes(id));
        await Promise.all(toRemove.map((r) => tx.interviewerAssignment.delete({ where: { id: r.id } })));
        await Promise.all(toAdd.map((talentId: string) => tx.interviewerAssignment.create({ data: { interviewId, talentId } })));
      }

      if (payload.rescheduleReason) {
        await tx.interviewNote.create({ data: { interviewId, content: `Reschedule: ${payload.rescheduleReason}`, isPrivate: true, authorTalentId: updatedById } });
      }

      return u;
    });

    return {
      id: updated.id,
      type: updated.type,
      status: updated.status,
      startTime: updated.startTime,
      endTime: updated.endTime,
      locationType: updated.locationType,
      locationDetails: updated.locationDetails,
    };
  }

  static async updateStatus({ companyId, interviewId, payload, updatedById }: any) {
    const interview = await prisma.interview.findUnique({ where: { id: interviewId } });
    if (!interview || interview.companyId !== companyId) throw new NotFoundError("Interview not found");

    const member = await prisma.companyMember.findFirst({ where: { companyId, talentId: updatedById, active: true } });
    if (!member) throw new ForbiddenError();

    const allowed = ["SCHEDULED", "In_REVIEW", "COMPLETED", "CANCELLED", "IN_PROGRESS"];
    if (!allowed.includes(payload.status)) throw new BadRequestError("Invalid status");

    const data: any = { status: payload.status };
    if (payload.actualStartTime) data.startTime = new Date(payload.actualStartTime);
    if (payload.actualEndTime) data.endTime = new Date(payload.actualEndTime);

    const updated = await prisma.interview.update({ where: { id: interviewId }, data });

    if (payload.notes) {
      await prisma.interviewNote.create({ data: { interviewId, content: payload.notes, isPrivate: true, authorTalentId: updatedById } });
    }

    return { id: updated.id, status: updated.status };
  }

  static async softDeleteInterview({ companyId, interviewId, payload, deletedById }: any) {
    const interview = await prisma.interview.findUnique({ where: { id: interviewId } });
    if (!interview || interview.companyId !== companyId) throw new NotFoundError("Interview not found");

    const member = await prisma.companyMember.findFirst({ where: { companyId, talentId: deletedById, active: true } });
    if (!member) throw new ForbiddenError();

    const updated = await prisma.interview.update({ where: { id: interviewId }, data: { status: "CANCELLED" } });
    await prisma.interviewNote.create({ data: { interviewId, content: `Cancelled: ${payload?.reason ?? "No reason provided"}`, isPrivate: true, authorTalentId: deletedById } });

    // optionally notify candidate

    return { id: updated.id, status: updated.status };
  }

  static async addAssignments({ companyId, interviewId, talentIds, addedById }: any) {
    const interview = await prisma.interview.findUnique({ where: { id: interviewId }, include: { application: { include: { job: true } } } });
    if (!interview || interview.companyId !== companyId) throw new NotFoundError("Interview not found");

    const member = await prisma.companyMember.findFirst({ where: { companyId, talentId: addedById, active: true } });
    if (!member) throw new ForbiddenError();

    // verify talents are company members
    const members = await prisma.companyMember.findMany({ where: { companyId, talentId: { in: talentIds }, active: true } });
    if (members.length !== talentIds.length) throw new BadRequestError("One or more talents are not company members");

    // conflict detection
    const start = interview.startTime;
    const end = interview.endTime;
    const conflict = await prisma.interview.findFirst({ where: { id: { not: interviewId }, interviewers: { some: { talentId: { in: talentIds } } }, AND: [ { startTime: { lt: end } }, { endTime: { gt: start } } ] } });
    if (conflict) throw new BadRequestError("One or more interviewers have conflicts");

    const created = await prisma.$transaction(async (tx) => {
      const creates = talentIds.map((tid: string) => tx.interviewerAssignment.create({ data: { interviewId, talentId: tid } }));
      return Promise.all(creates);
    });

    return created.map((c: any) => ({ id: c.id, talentId: c.talentId }));
  }

  static async removeAssignment({ companyId, interviewId, talentId, removedById }: any) {
    const interview = await prisma.interview.findUnique({ where: { id: interviewId } });
    if (!interview || interview.companyId !== companyId) throw new NotFoundError("Interview not found");

    const member = await prisma.companyMember.findFirst({ where: { companyId, talentId: removedById, active: true } });
    if (!member) throw new ForbiddenError();

    const assignment = await prisma.interviewerAssignment.findFirst({ where: { interviewId, talentId } });
    if (!assignment) throw new NotFoundError("Assignment not found");

    await prisma.interviewerAssignment.delete({ where: { id: assignment.id } });
    await prisma.interviewNote.create({ data: { interviewId, content: `Removed interviewer ${talentId} by ${removedById}`, isPrivate: true, authorTalentId: removedById } });

    return { success: true };
  }
}
