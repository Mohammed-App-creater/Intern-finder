import prisma  from "./prisma";
const conflicts = await prisma.interviewerAssignment.findMany({
  where: {
    talentId: { in: interviewerTalentIds },
    interview: {
      AND: [
        { status: { not: 'CANCELLED' } },
        { startTime: { lt: newEnd } },   // existing.start < newEnd
        { endTime: { gt: newStart } }    // existing.end > newStart
      ]
    }
  },
  include: { interview: true }
});
