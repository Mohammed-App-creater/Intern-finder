import prisma from "@/utils/prisma"; // adjust path
import { CreateJobInput } from "./job.validation";



export const createJob = async (companyId: string, data: CreateJobInput) => {
    try {
        return prisma.job.create({
            data: {
                companyId,
                ...data,
            },
        });
    } catch (error) {
        console.error("Error creating job:", error);
        throw new Error("Failed to create job");
    }
};

export const getAllJobs = async () => {
    try {
        return prisma.job.findMany();
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw new Error("Failed to fetch jobs");
    }
};

export const getJobsByCompanyId = async (companyId: string) => {
    try {
        return prisma.job.findMany({
            where: { companyId },
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw new Error("Failed to fetch jobs");
    }
};

