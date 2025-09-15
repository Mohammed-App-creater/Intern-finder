import prisma  from "../../utils/prisma";
import { NotFoundError, ForbiddenError } from "../../utils/errors";

/**
 * FeedbackService - orchestrates DB queries and ownership checks.
 *
 * Assumptions based on your schema:
 * - Interview has companyId
 * - InterviewerAssignment table is InterviewerAssignment with (interviewId, talentId)
 * - InterviewFeedback model exists as in your schema
 */

export const FeedbackService = {
  async ensureInterviewExistsAndBelongsToCompany(interviewId: string, companyId: string) {
    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
      select: { id: true, companyId: true },
    });
    if (!interview) throw new NotFoundError("Interview not found");
    if (interview.companyId !== companyId) throw new ForbiddenError("Interview does not belong to the company");
    return interview;
  },

  async ensureInterviewerAssigned(interviewId: string, interviewerId: string) {
    // InterviewerAssignment model name per your schema
    const assignment = await prisma.interviewerAssignment.findUnique({
      where: { interviewId_talentId: { interviewId, talentId: interviewerId } } as any,
    }).catch(() => null);

    // If unique constraint variable name different, fallback to findFirst
    if (!assignment) {
      const a2 = await prisma.interviewerAssignment.findFirst({
        where: { interviewId, talentId: interviewerId },
      });
      if (!a2) throw new ForbiddenError("Interviewer is not assigned to this interview");
      return a2;
    }

    return assignment;
  },

  async createFeedback(args: {
    companyId: string;
    interviewId: string;
    interviewerId: string;
    rating: number;
    recommendation: "PROCEED" | "HOLD" | "REJECT";
    comments?: string | null;
    createdByTalentId: string;
  }) {
    const { companyId, interviewId, interviewerId, rating, recommendation, comments, createdByTalentId } = args;

    // 1) ensure interview exists and belongs to company
    await this.ensureInterviewExistsAndBelongsToCompany(interviewId, companyId);

    // 2) ensure interviewer assigned
    await this.ensureInterviewerAssigned(interviewId, interviewerId);

    // 3) only the assigned interviewer (talent) may submit (strict rule)
    if (createdByTalentId !== interviewerId) {
      throw new ForbiddenError("Only the assigned interviewer can submit feedback");
    }

    // 4) create feedback
    const created = await prisma.interviewFeedback.create({
      data: {
        interviewId,
        interviewerId,
        rating,
        recommendation,
        comments,
      },
    });

    return created;
  },

  /**
   * List feedbacks and compute aggregate (avg rating, recommendation counts).
   * If viewerIsCompanyMember === false, only return aggregate.
   */
  async listFeedbacks(interviewId: string, companyId: string, viewerIsCompanyMember: boolean) {
    // ensure the interview is valid and belongs to company
    await this.ensureInterviewExistsAndBelongsToCompany(interviewId, companyId);

    // compute aggregate with prisma
    const agg = await prisma.interviewFeedback.aggregate({
      where: { interviewId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    // count recommendations grouped
    const groups = await prisma.interviewFeedback.groupBy({
      by: ["recommendation"],
      where: { interviewId },
      _count: { recommendation: true },
    });

    const recommendationCounts: Record<string, number> = { PROCEED: 0, HOLD: 0, REJECT: 0 };
    for (const g of groups) {
      const key = g.recommendation ?? "UNKNOWN";
      const count = (g as any)._count?.recommendation ?? 0;
      if (key in recommendationCounts) recommendationCounts[key] = count;
      else recommendationCounts[key] = count;
    }

    const aggregate = {
      averageRating: agg._avg.rating ? Number((agg._avg.rating).toFixed(2)) : null,
      count: agg._count.rating ?? 0,
      recommendations: recommendationCounts,
    };

    if (!viewerIsCompanyMember) {
      return { aggregate };
    }

    // company members see all feedback details
    const feedbacks = await prisma.interviewFeedback.findMany({
      where: { interviewId },
      orderBy: { createdAt: "asc" },
    });

    return { feedbacks, aggregate };
  },
};
