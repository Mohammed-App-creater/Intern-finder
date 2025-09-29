import { RegisterStep1DTO, RegisterStep2DTO, GetAllCompaniesDTO } from "./company.validation";
import prisma from "../../utils/prisma";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";
import { JwtUserPayload } from "@/types/User";

// corn jobs simulation 

function getPercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0; // avoid divide by zero
  return ((current - previous) / previous) * 100;
}


export const getJobStatsByDay = async (days: number = 7) => {
  const result = await prisma.$queryRawUnsafe<{
    day: string;
    views: number;
    applied: number;
  }[]>(`
    SELECT 
      DATE("createdAt") AS day,
      SUM(CASE WHEN action = 'VIEW' THEN 1 ELSE 0 END) AS views,
      SUM(CASE WHEN action = 'APPLIED' THEN 1 ELSE 0 END) AS applied
    FROM "JobStat"
    WHERE "createdAt" >= CURRENT_DATE - INTERVAL '${days} days'
    GROUP BY day
    ORDER BY day;
  `);

  return result;
};

export const getOrCreateDailySummary = async (companyId: string, day: Date) => {
  const normalizedDay = new Date(day.setHours(0, 0, 0, 0));

  const existing = await prisma.dailySummary.findUnique({
    where: {
      companyId_day: {  
        companyId,
        day: normalizedDay,
      },
    },
  });

  if (existing) return existing;

  // If not cached, calculate from JobStat
  const stats = await prisma.jobStat.groupBy({
    by: ["action"],
    _count: true,
    where: {
      companyId,
      createdAt: {
        gte: normalizedDay,
        lt: new Date(normalizedDay.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  });

  const views = stats.find((s) => s.action === "VIEW")?._count || 0;
  const applied = stats.find((s) => s.action === "APPLIED")?._count || 0;

  return prisma.dailySummary.create({
    data: {
      companyId,
      day: normalizedDay,
      views,
      applied,
    },
  });
};

export const getWeeklySummary = async (companyId: string, endDay: Date) => {
  // Normalize to midnight UTC
  const normalizedEnd = new Date(Date.UTC(endDay.getUTCFullYear(), endDay.getUTCMonth(), endDay.getUTCDate()));

  // Current week range (last 7 days)
  const weekStart = new Date(normalizedEnd);
  weekStart.setUTCDate(normalizedEnd.getUTCDate() - 6);

  // Previous week range
  const prevWeekEnd = new Date(weekStart);
  prevWeekEnd.setUTCDate(weekStart.getUTCDate() - 1);

  const prevWeekStart = new Date(prevWeekEnd);
  prevWeekStart.setUTCDate(prevWeekEnd.getUTCDate() - 6);

  // Current week stats
  const stats = await prisma.jobStat.groupBy({
    by: ["action"],
    _count: true,
    where: {
      companyId,
      createdAt: {
        gte: weekStart,
        lt: new Date(normalizedEnd.getTime() + 24 * 60 * 60 * 1000), // inclusive end
      },
    },
  });

  // Previous week stats
  const prevStats = await prisma.jobStat.groupBy({
    by: ["action"],
    _count: true,
    where: {
      companyId,
      createdAt: {
        gte: prevWeekStart,
        lt: new Date(prevWeekEnd.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  });

  const views = stats.find((s) => s.action === "VIEW")?._count || 0;
  const applied = stats.find((s) => s.action === "APPLIED")?._count || 0;

  const prevViews = prevStats.find((s) => s.action === "VIEW")?._count || 0;
  const prevApplied = prevStats.find((s) => s.action === "APPLIED")?._count || 0;

  const calcChange = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? 100 : 0;
    return ((curr - prev) / prev) * 100;
  };

  return {
    companyId,
    weekStart,
    weekEnd: normalizedEnd,
    views: {
      current: views,
      previous: prevViews,
      change: getPercentageChange(views, prevViews),
    },
    applied: {
      current: applied,
      previous: prevApplied,
      change: getPercentageChange(applied, prevApplied),
    },
  };
};

export const getMonthlySummary = async (companyId: string, endDay: Date) => {
  // Current month range
  const monthStart = new Date(Date.UTC(endDay.getUTCFullYear(), endDay.getUTCMonth(), 1));
  const monthEnd = new Date(Date.UTC(endDay.getUTCFullYear(), endDay.getUTCMonth() + 1, 0));

  // Previous month range
  const prevMonthStart = new Date(Date.UTC(endDay.getUTCFullYear(), endDay.getUTCMonth() - 1, 1));
  const prevMonthEnd = new Date(Date.UTC(endDay.getUTCFullYear(), endDay.getUTCMonth(), 0));

  // Current month stats
  const stats = await prisma.jobStat.groupBy({
    by: ["action"],
    _count: true,
    where: {
      companyId,
      createdAt: {
        gte: monthStart,
        lt: new Date(monthEnd.getTime() + 24 * 60 * 60 * 1000), // inclusive end
      },
    },
  });

  // Previous month stats
  const prevStats = await prisma.jobStat.groupBy({
    by: ["action"],
    _count: true,
    where: {
      companyId,
      createdAt: {
        gte: prevMonthStart,
        lt: new Date(prevMonthEnd.getTime() + 24 * 60 * 60 * 1000),
      },
    },
  });

  const views = stats.find((s) => s.action === "VIEW")?._count || 0;
  const applied = stats.find((s) => s.action === "APPLIED")?._count || 0;

  const prevViews = prevStats.find((s) => s.action === "VIEW")?._count || 0;
  const prevApplied = prevStats.find((s) => s.action === "APPLIED")?._count || 0;

  // Helper for % change
  const calcChange = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? 100 : 0; // avoid division by zero
    return ((curr - prev) / prev) * 100;
  };

  return {
    companyId,
    monthStart,
    monthEnd,
    views: {
      current: views,
      previous: prevViews,
      change: getPercentageChange(views, prevViews),
    },
    applied: {
      current: applied,
      previous: prevApplied,
      change: getPercentageChange(applied, prevApplied),
    },
  };
};

export const getYearlySummaryWithComparison = async (companyId: string, endDay: Date) => {
  const year = endDay.getUTCFullYear();

  // Current year
  const yearStart = new Date(Date.UTC(year, 0, 1));
  const yearEnd = new Date(Date.UTC(year, 11, 31));

  // Previous year
  const prevYearStart = new Date(Date.UTC(year - 1, 0, 1));
  const prevYearEnd = new Date(Date.UTC(year - 1, 11, 31));

  // Current year stats
  const currentStats = await prisma.jobStat.groupBy({
    by: ["action"],
    _count: true,
    where: {
      companyId,
      createdAt: { gte: yearStart, lt: new Date(yearEnd.getTime() + 86400000) },
    },
  });

  // Previous year stats
  const prevStats = await prisma.jobStat.groupBy({
    by: ["action"],
    _count: true,
    where: {
      companyId,
      createdAt: { gte: prevYearStart, lt: new Date(prevYearEnd.getTime() + 86400000) },
    },
  });

  const currentViews = currentStats.find(s => s.action === "VIEW")?._count || 0;
  const currentApplied = currentStats.find(s => s.action === "APPLIED")?._count || 0;

  const prevViews = prevStats.find(s => s.action === "VIEW")?._count || 0;
  const prevApplied = prevStats.find(s => s.action === "APPLIED")?._count || 0;

  return {
    companyId,
    year,
    views: {
      current: currentViews,
      previous: prevViews,
      change: getPercentageChange(currentViews, prevViews),
    },
    applied: {
      current: currentApplied,
      previous: prevApplied,
      change: getPercentageChange(currentApplied, prevApplied),
    },
  };
};


// Company Services

export const registerStep1 = async (data: RegisterStep1DTO) => {
  const existingCompany = await prisma.company.findUnique({
    where: { email: data.email },
  });
  if (existingCompany) {
    throw new Error("Email already registered");
  }

  const company = await prisma.company.create({
    data: {
      companyName: data.companyName,
      email: data.email,
      password: await hashPassword(data.password),
    },
    select: {
      id: true,
      companyName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return company;
};

export const registerStep2 = async (companyId: string, data: RegisterStep2DTO) => {
  const company = await prisma.company.update({
    where: { id: companyId },
    data: {
      phone: data.phone,
      linkedinUrl: data.linkedinUrl,
      websiteUrl: data.websiteUrl,
      headQuarter: data.headQuarter,
      branches: data.branches,
      industries: data.industries,
      logoUrl: data.logoUrl,
      description: data.description,
      techStack: data.techStack,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      contactJobTitle: data.contactJobTitle,
      teamSize: data.teamSize,
    },
    omit: {
      password: true,
    },
  });
  // Build JWT payload for a company
  const payload: JwtUserPayload = {
    id: company.id,
    email: company.email,
    role: "COMPANY",
    username: company.companyName, // optional if you want to treat name as username

    companyId: company.id,
    companyMember: true, 
  };

  const token = generateToken(payload);


  return { token, company };
};

export const topCompany = async () => {
  const companies = await prisma.company.findMany({
    orderBy: {
      employeeCount: "desc",
    },
    take: 5,
    include: {
      _count: {
        select: { jobs: true },
      },
    },
  });
  return companies;
};

export const loginCompany = async (email: string, password: string) => {
  const company = await prisma.company.findUnique({ where: { email } });
  if (!company) {
    throw new Error("Invalid email or password");
  }
  const isValid = await verifyPassword(password, company.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }
  // Build JWT payload for a company
  const payload: JwtUserPayload = {
    id: company.id,
    email: company.email,
    role: "COMPANY",
    username: company.companyName, // optional if you want to treat name as username

    companyId: company.id,
    companyMember: true, // company accounts aren’t "members"
  };

  const token = generateToken(payload);
  const { password: _password, ...safe } = company as any;
  return { token, user: safe };
};

export const getAllCompany = async (params: GetAllCompaniesDTO) => {
  const {
    page = 1,
    limit = 10,
    search,
    location,
    industries,
    teamSize,
    sortBy,
    sortOrder
  } = params;

  const skip = (page - 1) * limit;

  // Build where conditions
  const whereConditions: any = {};

  // Search by company name
  if (search) {
    whereConditions.companyName = {
      contains: search,
      mode: 'insensitive' as any
    };
  }

  // Filter by location (headQuarter)
  if (location) {
    whereConditions.headQuarter = {
      contains: location,
      mode: 'insensitive' as any
    };
  }

  // Filter by industries
  if (industries && industries.length > 0) {
    whereConditions.industries = {
      hasSome: industries
    };
  }

  // Filter by team size
  if (teamSize && teamSize.length > 0) {
    whereConditions.teamSize = {
      in: teamSize
    };
  }

  // Get total count for pagination
  const totalCount = await prisma.company.count({
    where: whereConditions
  });

  // Get companies with pagination and sorting
  const companies = await prisma.company.findMany({
    where: whereConditions,
    skip,
    take: Number(limit),
    orderBy: {
      [sortBy]: sortOrder
    },
    select: {
      id: true,
      companyName: true,
      email: true,
      phone: true,
      linkedinUrl: true,
      instagram: true,
      websiteUrl: true,
      employeeCount: true,
      headQuarter: true,
      branches: true,
      industries: true,
      logoUrl: true,
      description: true,
      techStack: true,
      contactName: true,
      contactEmail: true,
      contactPhone: true,
      contactJobTitle: true,
      teamSize: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          jobs: true
        }
      }
    }
  });

  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    companies,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNextPage,
      hasPreviousPage,
      limit
    }
  };
};

export const getCompanyById = async (companyId: string) => {
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: {
      id: true,
      companyName: true,
      email: true,
      phone: true,
      linkedinUrl: true,
      instagram: true,
      websiteUrl: true,
      employeeCount: true,
      headQuarter: true,
      branches: true,
      industries: true,
      logoUrl: true,
      description: true,
      techStack: true,
      contactName: true,
      contactEmail: true,
      contactPhone: true,
      contactJobTitle: true,
      teamSize: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          jobs: true
        }
      }
    }
  });
  if (!company) {
    throw new Error("Company not found");
  }
  return company;
};

export const updateCompany = async (companyId: string, data: Partial<RegisterStep2DTO>) => {
  const company = await prisma.company.update({
    where: { id: companyId },
    data,
    select: {
      id: true,
      companyName: true,
      email: true,
      phone: true,
      linkedinUrl: true,
      instagram: true,
      websiteUrl: true,
      employeeCount: true,
      headQuarter: true,
      branches: true,
      industries: true,
      logoUrl: true,
      description: true,
      techStack: true,
      contactName: true,
      contactEmail: true,
      contactPhone: true,
      contactJobTitle: true,
      teamSize: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return company;
};

export const companyDashboardTopStats = async (companyId: string) => {
  const totalJobs = await prisma.job.count({
    where: { companyId },
  });
  const newMassages = 5; // Placeholder for future implementation
  const newCandidates = await prisma.jobApplication.count({
    where: {
      job: {
        companyId
      },
      status: "accepted"
    },
  });
  return {
    totalJobs,
    newMassages,
    newCandidates
  };
}

export const companyDashboardMiddleStats = async (companyId: string, day: Date) => {
  const company = prisma.company.findUnique({ where: { id: companyId } });
  if (!company) throw new Error("Company not found");
  return getOrCreateDailySummary(companyId, day)
};

export const companyDashboardOpenJobs = async (companyId: string) => {
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) throw new Error("Company not found");
  const jobs = await prisma.job.count({
    where: {
      companyId,
      status: "live"
    }
  });
  return jobs;
}

export const companyDashboardApplicationSummary = async (companyId: string) => {
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) throw new Error("Company not found");
  const applications = await prisma.jobApplication.groupBy({
    by: ["status"],
    _count: true,
    where: { job: { companyId } },
  });
  const summary = {
    pending: 0,
    shortlisted: 0,
    interviewed: 0,
    accept: 0,
    reject: 0,
  };
  applications.forEach(app => {
    summary[app.status.toLowerCase() as keyof typeof summary] = app._count;
  });
  return summary;
}

export const getLatestJobsUpdate = async (companyId: string) => {
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) throw new Error("Company not found");
  const jobs = await prisma.job.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" }, // latest jobs
    take: 4, // limit to 4
    include: {
      _count: {
        select: { applications: true }, // count applications
      },
      company: true, // to get company info like name, logo
    },
  });

  return jobs.map((job) => ({
    id: job.id,
    title: job.title,
    location: job.location,
    categories: job.categories,
    tags: job.tags,
    company: job.company.companyName, // or logo if you have it
    companyLogo: job.company.logoUrl,
    applied: job._count.applications,
    capacity: job.capacity,
    remaining: job.capacity ? job.capacity - job._count.applications : null,
  }));
};