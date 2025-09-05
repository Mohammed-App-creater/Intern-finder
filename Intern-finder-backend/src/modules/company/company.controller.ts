import { successResponse } from "@/utils/response";
import { registerStep1, registerStep2, topCompany, loginCompany, getAllCompany, getCompanyById, updateCompany, companyDashboardTopStats, companyDashboardMiddleStats, getWeeklySummary, getMonthlySummary, getYearlySummary } from "./company.service";
import { NextFunction, Request, Response } from "express";

export const registerStep1Handler = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const company = await registerStep1(data);
        res.status(201).json(company);
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
        const companyId = req.params.companyId;
        const data = req.body;
        const company = await registerStep2(companyId, data);
        res.status(200).json(company);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: String(error) });
        }
    }
};

export const topCompanyHandler = async (req: Request, res: Response) => {
    try {
        const companies = await topCompany();
        res.status(200).json(companies);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: String(error) });
        }
    }
};

export const loginCompanyHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await loginCompany(email, password);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: String(error) });
        }
    }
};

export const getAllCompanyHandler = async (req: Request, res: Response) => {
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
            res.status(400).json({
                success: false,
                data: null,
                error: String(error)
            });
        }
    }
};

export const getCompanyByIdHandler = async (req: Request, res: Response) => {
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

export const updateCompanyHandler = async (req: Request, res: Response) => {
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
            res.status(400).json({
                success: false,
                data: null,
                error: String(error)
            });
        }
    }
};

// Company Dashboard Handlers

export const getCompanyDashboardTopStatusHandler = async (req: Request, res: Response) => {
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
            res.status(400).json({
                success: false,
                data: null,
                error: String(error)
            });
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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getYearlyStatsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = req.params;
    const { day } = req.query;
    const dayDate = day ? new Date(day as string) : new Date();

    const stats = await getYearlySummary(companyId, dayDate);

    res.status(200).json(successResponse(stats, "Yearly stats fetched"));
  } catch (error) {
    console.error(error);
    next(error);
  }
};
