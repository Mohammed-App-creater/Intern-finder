// companyMember.service.ts
import { PrismaClient } from "@prisma/client";
import { NotFoundError, BadRequestError, ForbiddenError } from "./errors";
import { detectConflictsForTalents } from "./conflict.service";

const prisma = new PrismaClient();

export class CompanyMemberService {
  // 1. List company members
  static async listMembers({ companyId, filters, requesterId }: any) {
    // Ensure requester is a company member
    const requesterMember = await prisma.companyMember.findFirst({ where: { companyId, talentId: requesterId, active: true } });
    if (!requesterMember) throw new ForbiddenError("Not a company member");

    const where: any = { companyId };
    if (filters?.role) where.role = filters.role;
    if (typeof filters?.active !== "undefined") where.active = filters.active;

    const members = await prisma.companyMember.findMany({
      where,
      include: { talent: { select: { id: true, fullName: true, profileImageUrl: true } } },
      orderBy: { createdAt: "asc" },
    });

    return members.map((m) => ({
      id: m.id,
      talentId: m.talentId,
      fullName: m.talent?.fullName ?? null,
      role: m.role,
      isAdmin: m.isAdmin,
      profileImageUrl: m.talent?.profileImageUrl ?? null,
      active: m.active,
    }));
  }

  // 2. Add company member
  static async addMember({ companyId, body, requesterId }: any) {
    // requester must be company admin
    const adminRecord = await prisma.companyMember.findFirst({ where: { companyId, talentId: requesterId, active: true, isAdmin: true } });
    if (!adminRecord) throw new ForbiddenError("Only company admins can add members");

    const { talentId, role, isAdmin } = body;

    // Ensure talent exists
    const talent = await prisma.talent.findUnique({ where: { id: talentId } });
    if (!talent) throw new NotFoundError("Talent not found");

    // Ensure not already a member (active)
    const existing = await prisma.companyMember.findUnique({ where: { companyId_talentId: { companyId, talentId } } as any }).catch(() => null);
    if (existing) {
      if (existing.active) throw new BadRequestError("Talent is already a company member");
      // If soft-deleted (active=false), reactivate and update role/isAdmin
      const updated = await prisma.companyMember.update({
        where: { id: existing.id },
        data: { active: true, role, isAdmin },
      });
      return {
        id: updated.id,
        talentId: updated.talentId,
        role: updated.role,
        isAdmin: updated.isAdmin,
      };
    }

    const created = await prisma.companyMember.create({
      data: { companyId, talentId, role, isAdmin: !!isAdmin, active: true },
    });

    // audit note (private)
    await prisma.interviewNote.create({
      data: {
        content: `Company member ${talentId} added by ${requesterId}`,
        isPrivate: true,
        authorTalentId: requesterId,
      },
    }).catch(() => {});

    return {
      id: created.id,
      talentId: created.talentId,
      role: created.role,
      isAdmin: created.isAdmin,
    };
  }

  // 3. Get talent availability (busy slots)
  static async getTalentAvailability({ talentId, requesterId, query }: any) {
    const from = query.from ? new Date(query.from) : undefined;
    const to = query.to ? new Date(query.to) : undefined;

    // Permission check: self OR company member for same company where talent is a member
    if (requesterId !== talentId) {
      // get companies requester belongs to
      const requesterCompanies = await prisma.companyMember.findMany({ where: { talentId: requesterId, active: true }, select: { companyId: true } });
      const companyIds = requesterCompanies.map((c) => c.companyId);
      if (companyIds.length === 0) throw new ForbiddenError("Not authorized");

      // check whether talent is a member of any of those companies
      const link = await prisma.companyMember.findFirst({ where: { talentId, companyId: { in: companyIds } } });
      if (!link) throw new ForbiddenError("Not authorized to view this talent's availability");
    }

    const where: any = {
      OR: [
        { interviewers: { some: { talentId } } }, // as interviewer
        { application: { talentId } }, // as candidate
      ],
    };
    if (from || to) {
      where.AND = [];
      if (from) where.AND.push({ endTime: { gte: from } });
      if (to) where.AND.push({ startTime: { lte: to } });
    }

    const interviews = await prisma.interview.findMany({ where, orderBy: { startTime: "asc" } });

    const busy = interviews.map((iv) => ({ start: iv.startTime, end: iv.endTime }));

    return { busy };
  }

  // 4. Check conflicts for interviewer IDs in a time window (uses conflict service)
  static async checkConflicts({ companyId, body, requesterId }: any) {
    // ensure requester is company member
    const member = await prisma.companyMember.findFirst({ where: { companyId, talentId: requesterId, active: true } });
    if (!member) throw new ForbiddenError("Not authorized");

    const start = new Date(body.startTime);
    const end = new Date(body.endTime);
    if (start >= end) throw new BadRequestError("startTime must be before endTime");

    // detect conflicts
    const conflicts = await detectConflictsForTalents({ talentIds: body.interviewerTalentIds, start, end, excludeInterviewId: body.excludeInterviewId });

    // Format response
    return { conflicts: conflicts.map((c) => ({ interviewerTalentId: c.interviewerTalentId, interviewId: c.interviewId, startTime: c.startTime, endTime: c.endTime })) };
  }
}
