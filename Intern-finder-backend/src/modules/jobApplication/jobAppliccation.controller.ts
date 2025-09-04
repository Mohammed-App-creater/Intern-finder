import { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";
import { errorResponse, successResponse } from "../../utils/response";
import { JobApplicationService } from "./jobAppliccation.service";
import { ApplicationStatus } from "@prisma/client";

export const createApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id as string;
        const { jobId, additionalInfo, resumeUrl } = req.body;
        const application = await JobApplicationService.createApplication(userId, jobId, additionalInfo, resumeUrl);
        return res.json(successResponse(application, "Application submitted"));
    } catch (err: any) {
        return res.status(400).json(errorResponse(err.message));
    }
};

export const listMyApplications = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string;
        const apps = await JobApplicationService.listMyApplications(userId);
        return res.json(successResponse(apps));
    } catch (err: any) {
        return res.status(400).json(errorResponse(err.message));
    }
};

export const listJobApplicationsForCompany = async (req: Request, res: Response) => {
    try {
        const companyId = req.user?.id as string;
        const { jobId } = req.params as { jobId: string };
        const apps = await JobApplicationService.listJobApplicationsForCompany(companyId, jobId);
        return res.json(successResponse(apps));
    } catch (err: any) {
        return res.status(400).json(errorResponse(err.message));
    }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
    try {
        const companyId = req.user?.id as string;
        const { id } = req.params as { id: string };
        const { status } = req.body as { status: ApplicationStatus };
        const updated = await JobApplicationService.updateStatus(companyId, id, status);
        return res.json(successResponse(updated, "Status updated"));
    } catch (err: any) {
        return res.status(400).json(errorResponse(err.message));
    }
};

