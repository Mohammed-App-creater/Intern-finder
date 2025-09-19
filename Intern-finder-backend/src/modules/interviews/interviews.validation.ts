import { z } from "zod";

export const getInterviewsQuery = z.object({
    from: z.string().optional(), // ISO date
    to: z.string().optional(),
    status: z.string().optional(),
    type: z.string().optional(),
    jobId: z.string().uuid().optional(),
    interviewerId: z.string().uuid().optional(),
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
});


export const createInterviewBody = z.object({
    type: z.enum(["PHONE", "WRITTEN", "SKILL", "FINAL", "ONSITE", "VIDEO", "SKILL_TEST"] as const).or(z.string()),
    startTime: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "Invalid startTime" }),
    endTime: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "Invalid endTime" }),
    timezone: z.string().optional(),
    locationType: z.string().optional(),
    locationDetails: z.string().optional(),
    interviewerTalentIds: z.array(z.uuid()).min(1),
    notifyInterviewer: z.boolean().optional().default(true),
    moveApplicationToStage: z.boolean().optional().default(false),
});


export const updateInterviewBody = z.object({
    type: z.string().optional(),
    startTime: z.string().optional().refine((s) => !s || !Number.isNaN(Date.parse(s)), { message: "Invalid startTime" }),
    endTime: z.string().optional().refine((s) => !s || !Number.isNaN(Date.parse(s)), { message: "Invalid endTime" }),
    timezone: z.string().optional(),
    locationType: z.string().optional(),
    locationDetails: z.string().optional(),
    interviewerTalentIds: z.array(z.string().uuid()).optional(),
    rescheduleReason: z.string().optional(),
});


export const statusUpdateBody = z.object({
    status: z.enum(["SCHEDULED", "IN_REVIEW", "COMPLETED", "CANCELLED", "In_REVIEW", "IN_PROGRESS"] as const).or(z.string()),
    actualStartTime: z.string().optional(),
    actualEndTime: z.string().optional(),
    notes: z.string().optional(),
});


export const bulkAssignmentsBody = z.object({
    talentIds: z.array(z.string().uuid()).min(1),
});


export const deleteAssignmentParams = z.object({
    companyId: z.string().uuid(),
    interviewId: z.string().uuid(),
    talentId: z.string().uuid(),
});