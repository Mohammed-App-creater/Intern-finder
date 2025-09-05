import { RegisterStep1DTO, RegisterStep2DTO, GetAllCompaniesDTO } from "./company.validation";
import prisma from "../../utils/prisma";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";

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
            instagram: data.instagram,
            websiteUrl: data.websiteUrl,
            employeeCount: data.employeeCount,
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
    return company;
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
    const token = generateToken(company.id);
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
        take: limit,
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