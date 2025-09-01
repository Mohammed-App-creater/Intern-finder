import { RegisterStep1DTO, RegisterStep2DTO } from "./company.validation";
import prisma from "../../utils/prisma";

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
            password: data.password,
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