import prisma from "@/utils/prisma"; // adjust path
import { z } from "zod";
import { createJobSchema } from "./job.validation";

type CreateJobInput = z.infer<typeof createJobSchema>;

export const createJob = async (companyId: string, data: CreateJobInput) => {
    try{
    const company = await prisma.company.findUnique({
        where: { id: companyId },
    });
    if (!company) throw new Error("Company not found");

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
