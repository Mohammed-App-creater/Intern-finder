import { NextFunction, Request, Response } from "express";
import prisma from "../../utils/prisma";
import { createJobSchema } from "./job.validation";
import { createJob, getJobsByCompanyId, getAllJobs, getJobById, applyToJob } from "./job.service"
import { errorResponse, successResponse } from "../../utils/response";

export const createJobController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // validate input
        const parsedData = createJobSchema.parse(req.body);
        const { companyId } = req.params;
        const company = await prisma.company.findUnique({
            where: { id: companyId },
        });
        if (!company) return res.status(400).json(errorResponse("Company not found", 400));

        const job = await createJob(companyId, parsedData);

        res.status(201).json(successResponse(job, "Job created"));
    } catch (error: any) {
        if (error.name === "ZodError") {
            return res.json(errorResponse("Invalid input", 400));
        }
        console.error(error);
        next(error);
    }
};

export const getAllJobsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobs = await getAllJobs(req.query);
        res.status(200).json(successResponse(jobs, "Jobs fetched"));
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const getJobsByCompanyIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyId } = req.params;
        const company = await prisma.company.findUnique({
            where: { id: companyId },
        });
        if (!company) return res.status(400).json(errorResponse("Company not found", 400));
        const jobs = await getJobsByCompanyId(companyId);
        res.status(200).json(successResponse(jobs, "Jobs fetched"));
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const getJobByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { jobId } = req.params;
        const job = await getJobById(jobId);
        res.status(200).json(successResponse(job, "Job fetched"));
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const applyToJobController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { jobId } = req.params;
        const { talentId, additionalInfo, resumeUrl } = req.body;

        const application = await applyToJob(jobId, talentId, additionalInfo, resumeUrl);
        res.status(201).json(successResponse(application, "Application submitted"));
    } catch (error) {
        console.error(error);
        next(error);
    }
};
