// conflict.service.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function detectConflictsForTalents(options: {
  talentIds: string[];
  start: Date;
  end: Date;
  excludeInterviewId?: string | null;
}) {
  const { talentIds, start, end, excludeInterviewId } = options;

  // Find interviews that overlap the given range and include any of the talents as interviewer
  const where: any = {
    interviewers: { some: { talentId: { in: talentIds } } },
    AND: [{ startTime: { lt: end } }, { endTime: { gt: start } }],
  };
  if (excludeInterviewId) where.id = { not: excludeInterviewId };

  const interviews = await prisma.interview.findMany({
    where,
    include: { interviewers: true },
  });

  // Map each matching assignment to a conflict record per talent
  const conflicts: Array<{ interviewerTalentId: string; interviewId: string; startTime: Date; endTime: Date }> = [];

  for (const iv of interviews) {
    for (const a of iv.interviewers) {
      if (talentIds.includes(a.talentId)) {
        conflicts.push({
          interviewerTalentId: a.talentId,
          interviewId: iv.id,
          startTime: iv.startTime,
          endTime: iv.endTime,
        });
      }
    }
  }

  return conflicts;
}
