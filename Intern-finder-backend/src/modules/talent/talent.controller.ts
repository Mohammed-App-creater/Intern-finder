import {
    registerStep1,
    registerStep2,
    loginTalent,
    getTotalJobsApplied,
    getInterviewedCount,
    getJobAppliedStatus,
    getUpcomingInterviews,
    getRecentApplicationsHistory,
    getTalentDashboardStats,
    getTalentByToken
} from "./talent.service";
import { Request, Response } from "express";


export const registerStep1Handler = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const talent = await registerStep1(data);
        res.status(201).json(talent);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: String(error) });
        }
    }
};

export const registerStep2Handler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const data = req.body;
        const talent = await registerStep2(talentId, data);
        res.status(200).json(talent);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: String(error) });
        }
    }
};

export const loginTalentHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await loginTalent(email, password);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: String(error) });
        }
    }
};

// Dashboard handlers
export const getTotalJobsAppliedHandler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const totalJobs = await getTotalJobsApplied(talentId);
        res.status(200).json({
            success: true,
            data: { totalJobsApplied: totalJobs },
            error: null
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                data: null,
                error: error.message
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: String(error)
            });
        }
    }
};

export const getInterviewedCountHandler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const interviewedCount = await getInterviewedCount(talentId);
        res.status(200).json({
            success: true,
            data: { interviewedCount },
            error: null
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                data: null,
                error: error.message
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: String(error)
            });
        }
    }
};

export const getJobAppliedStatusHandler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const statusCounts = await getJobAppliedStatus(talentId);
        res.status(200).json({
            success: true,
            data: { jobStatusCounts: statusCounts },
            error: null
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                data: null,
                error: error.message
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: String(error)
            });
        }
    }
};

export const getUpcomingInterviewsHandler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const upcomingInterviews = await getUpcomingInterviews(talentId);
        res.status(200).json({
            success: true,
            data: { upcomingInterviews },
            error: null
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                data: null,
                error: error.message
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: String(error)
            });
        }
    }
};

export const getRecentApplicationsHistoryHandler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
        const recentApplications = await getRecentApplicationsHistory(talentId, limit);
        res.status(200).json({
            success: true,
            data: { recentApplications },
            error: null
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                data: null,
                error: error.message
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: String(error)
            });
        }
    }
};

export const getTalentDashboardStatsHandler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const dashboardStats = await getTalentDashboardStats(talentId);
        res.status(200).json({
            success: true,
            data: dashboardStats,
            error: null
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                data: null,
                error: error.message
            });
        } else {
            res.status(400).json({
                success: false,
                data: null,
                error: String(error)
            });
        }
    }
};

export const getTalentByIdHandler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const talent = await (await import("./talent.service")).getTalentById(talentId);
        res.status(200).json({ success: true, data: talent, error: null });
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ success: false, data: null, error: error.message });
        } else {
            res.status(404).json({ success: false, data: null, error: String(error) });
        }
    }
};


export const updateTalentHandler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const body = req.body;
        const updated = await (await import("./talent.service")).updateTalent(talentId, body);
        res.status(200).json({ success: true, data: updated, error: null });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, data: null, error: error.message });
        } else {
            res.status(400).json({ success: false, data: null, error: String(error) });
        }
    }
}

export const updateBasicInfoHandler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const updated = await (await import("./talent.service")).updateBasicInfo(talentId, req.body);
        res.status(200).json({ success: true, data: updated, error: null });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, data: null, error: error.message });
        } else {
            res.status(400).json({ success: false, data: null, error: String(error) });
        }
    }
};

export const updateEmailHandler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const { email } = req.body;
        const updated = await (await import("./talent.service")).updateEmail(talentId, email);
        res.status(200).json({ success: true, data: updated, error: null });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, data: null, error: error.message });
        } else {
            res.status(400).json({ success: false, data: null, error: String(error) });
        }
    }
};

export const changePasswordHandler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const { oldPassword, newPassword } = req.body;
        await (await import("./talent.service")).changePassword(talentId, oldPassword, newPassword);
        res.status(200).json({ success: true, data: { message: "Password updated" }, error: null });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, data: null, error: error.message });
        } else {
            res.status(400).json({ success: false, data: null, error: String(error) });
        }
    }
};

export const updateNotificationSettingsHandler = async (req: Request, res: Response) => {
    try {
        const talentId = req.params.talentId;
        const { application, job, recommendation, alert } = req.body;
        const updated = await (await import("./talent.service")).updateNotificationSettings(talentId, {
            application,
            job,
            recommendation,
            alert
        });
        res.status(200).json({ success: true, data: updated, error: null });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ success: false, data: null, error: error.message });
        } else {
            res.status(400).json({ success: false, data: null, error: String(error) });
        }
    }
};
