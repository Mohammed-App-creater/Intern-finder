import { errorResponse, successResponse } from "@/utils/response";
import { registerStep1, registerStep2, topCompany, loginCompany, getAllCompany, getCompanyById, updateCompany, companyDashboardTopStats, companyDashboardMiddleStats, getWeeklySummary, getMonthlySummary, getYearlySummaryWithComparison, companyDashboardOpenJobs, companyDashboardApplicationSummary, getLatestJobsUpdate } from "./company.service";
import { NextFunction, Request, Response } from "express";

export const registerStep1Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const company = await registerStep1(data);
        res.status(201).json(company);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(errorResponse(error.message, 400));
        }
        else {
            next(error);
        }
    }
};

export const registerStep2Handler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const companyId = req.params.companyId;
        const data = req.body;
        const company = await registerStep2(companyId, data);
        res.status(200).json(company);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(errorResponse(error.message, 400));
        } else {
            next(error);
        }
    }
};

export const topCompanyHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const companies = await topCompany();
        res.status(200).json(companies);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(errorResponse(error.message, 400));
        } else {
            next(error);
        }
    }
};

export const loginCompanyHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await loginCompany(email, password);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(errorResponse(error.message, 400));
        } else {
            next(error)
        }
    }
};

export const getAllCompanyHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllCompany(req.query as any);
        res.status(200).json({
            success: true,
            data: result,
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
            next(error)
        }
    }
};

export const getCompanyByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const companyId = req.params.companyId;
        const company = await getCompanyById(companyId);
        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }
        res.status(200).json(company);
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
}

export const updateCompanyHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const companyId = req.params.companyId;
        const data = req.body;
        const company = await updateCompany(companyId, data);
        res.status(200).json({
            success: true,
            data: company,
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
            next(error);
        }
    }
};

// Company Dashboard Handlers

export const getCompanyDashboardTopStatusHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const companyId = req.params.companyId;
        const dashboardData = await companyDashboardTopStats(companyId);
        res.status(200).json({
            success: true,
            data: dashboardData,
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
            next(error);
        }
    }
};

export const getMiddleStatsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyId } = req.params;
        const { day } = req.query;
        const dayDate = day ? new Date(day as string) : new Date();

        const stats = await getWeeklySummary(companyId, dayDate);

        res.status(200).json(successResponse(stats, "Weekly stats fetched"));
    } catch (error: any) {
         if (error.message === "Company not found") {
            res.status(400).json(errorResponse(error.message, 400));
        }
        next(error);
    }
};

export const getMonthlyStatsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyId } = req.params;
        const { day } = req.query;
        const dayDate = day ? new Date(day as string) : new Date();

        const stats = await getMonthlySummary(companyId, dayDate);

        res.status(200).json(successResponse(stats, "Monthly stats fetched"));
    } catch (error: any) {
         if (error.message === "Company not found") {
            res.status(400).json(errorResponse(error.message, 400));
        }
        next(error);
    }
};

export const getYearlyStatsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyId } = req.params;
        const { day } = req.query;
        const dayDate = day ? new Date(day as string) : new Date();

        const stats = await getYearlySummaryWithComparison(companyId, dayDate);

        res.status(200).json(successResponse(stats, "Yearly stats fetched"));
    } catch (error: any) {
          if (error.message === "Company not found") {
            res.status(400).json(errorResponse(error.message, 400));
        }
        next(error);
    }
};

export const getCompanyDashboardOpenJobsCountController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyId } = req.params;
        const stats = await companyDashboardOpenJobs(companyId);
        res.status(200).json(successResponse(stats, "Open jobs count fetched"));
    } catch (error: any) {
        if (error.message === "Company not found") {
            res.status(400).json(errorResponse("Company not found", 400));
        }
        next(error);
    }
}

export const getCompanyDashboardApplicationSummery = async (req: Request, res: Response, next: NextFunction) => {
    try{
    const { companyId } = req.params;
    return res.status(200).json(successResponse(companyDashboardApplicationSummary(req.params.companyId), "Application summary fetched"));
    } catch (error) {
        next(error);
    }
}

export const getCompanyDashboardJobUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const { companyId } = req.params;
    try {
        const jobUpdates = await getLatestJobsUpdate(companyId);
        res.status(200).json(successResponse(jobUpdates, "Job updates fetched"));
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json(errorResponse(error.message, 400));
        } else {
            next(error);
        }
    }
}