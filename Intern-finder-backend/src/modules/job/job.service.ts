import prisma from "../../utils/prisma"; // adjust path
import { CreateJobInput, JobFilters } from "./job.validation";
import { Prisma } from "@prisma/client/wasm";



export const logJobStat = async (jobId: string, companyId: string, action: "VIEW" | "APPLIED") => {
  return prisma.jobStat.create({
    data: { jobId, companyId, action },
  });
};

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

export const getAllJobs = async (filters: JobFilters = {}) => {
  try {
    const where: Prisma.JobWhereInput = {};

    if (filters.search) {
      where.title = { contains: filters.search, mode: "insensitive" };
    }

    if (filters.location) {
      where.location = { contains: filters.location, mode: "insensitive" };
    }

    if (filters.categories?.length) {
      where.categories = { hasSome: filters.categories };
    }

    if (filters.minExperienceYears !== undefined) {
      where.minExperienceYears = { lte: filters.minExperienceYears };
    }

    if (filters.datePosted) {
      const now = new Date();
      let cutoff: Date;

      if (filters.datePosted === "today") {
        cutoff = new Date(now.setHours(0, 0, 0, 0));
      } else if (filters.datePosted === "week") {
        cutoff = new Date(now.setDate(now.getDate() - 7));
      } else {
        cutoff = new Date(now.setDate(now.getDate() - 30));
      }

      where.createdAt = { gte: cutoff };
    }

    const salaryConditions: Prisma.JobWhereInput[] = [];
    if (filters.salaryMin !== undefined) {
      salaryConditions.push({
        minSalary: {
          gte: filters.salaryMin, // still string in DB
        },
      });
    }
    if (filters.salaryMax !== undefined) {
      salaryConditions.push({
        maxSalary: {
          lte: filters.salaryMax,
        },
      });
    }
    if (salaryConditions.length > 0) {
      where.AND = salaryConditions;
    }

    // 🏷️ Tags
    if (filters.tags?.length) {
      where.tags = { hasSome: filters.tags };
    }

    return await prisma.job.findMany({
      where,
      select: {
        id: true,
        title: true,
        categories: true,
        tags: true,
        location: true,
        minSalary: true,
        maxSalary: true,
        environmentType: true,
        createdAt: true,
        company: {
          select: {
            id: true,
            companyName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch jobs");
  }
};

export const getJobById = async (jobId: string) => {
  try {
    const job = await prisma.job.update({
      where: { id: jobId },
      data: { viewCount: { increment: 1 } },
      include: {
        company: { select: { id: true, companyName: true } },
      },
    });

    // Fire-and-forget everything
    (async () => {
      try { 
          await logJobStat(jobId, job.companyId, "VIEW");
      } catch (err) {
        console.error("Notification failed:", err);
      }
    })();

    return job;
  } catch {
    throw new Error("Job not found");
  }

};

export const getJobsByCompanyId = async (companyId: string) => {
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) throw new Error("Company not found");

  const jobs = await prisma.job.findMany({ where: { companyId } });
  return jobs;
};

