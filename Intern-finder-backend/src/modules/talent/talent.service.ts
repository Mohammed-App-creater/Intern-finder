import { RegisterStep1DTO, RegisterStep2DTO } from "./talent.types";
import prisma from "../../utils/prisma";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";
import { normalizeToISODateString } from "../../utils/date";
import { JwtUserPayload } from "@/types/User";


export const registerStep1 = async (data: RegisterStep1DTO) => {
    // Check if email already exists
    const existingTalent = await prisma.talent.findUnique({
        where: { email: data.email },
    });
    if (existingTalent) {
        throw new Error("Email already registered");
    }
    // Create new talent with step 1 data
    const talent = await prisma.talent.create({
        data: {
            fullName: data.fullName,
            email: data.email,
            password: await hashPassword(data.password), // hash password
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return talent;
};

export const registerStep2 = async (talentId: string, data: RegisterStep2DTO) => {
    // Update talent profile with step 2 data
    const talent = await prisma.talent.update({
        where: { id: talentId },
        data: {
            locations: data.location,
            phoneNumber: data.phoneNumber,
            fieldOfStudy: data.fieldOfStudy,
            program: data.program,
            workingEnvironment: data.workingEnvironment,
            preferredRole: data.preferredRole,
            linkedinUrl: data.linkedinUrl,
            bio: data.bio,
            profileImageUrl: data.profileImageUrl,
            resumeUrl: data.resumeUrl,
        },
    });

    // Check if talent is part of any company
    const membership = await prisma.companyMember.findFirst({
        where: { talentId: talent.id, active: true },
    });

    const payload: JwtUserPayload = {
        id: talent.id,
        email: talent.email,
        role: "TALENT",
        username: talent.fullName,
        talentId: talent.id,
        companyId: membership?.companyId,
        companyMember: !!membership,
    };

    const token = generateToken(payload);

    // strip sensitive data before returning
    const { password: _password, ...safeTalent } = talent as any;

    return { token, talent: safeTalent };
};

export const loginTalent = async (email: string, password: string) => {
    // 1. Find the talent by email
    const talent = await prisma.talent.findUnique({ where: { email } });
    if (!talent) {
        throw new Error("Invalid email or password");
    }

    // 2. Verify password
    const isValid = await verifyPassword(password, talent.password);
    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    // 3. Check if talent is part of a company
    const membership = await prisma.companyMember.findFirst({
        where: { talentId: talent.id, active: true },
    });

    // 4. Build JWT payload
    const payload: JwtUserPayload = {
        id: talent.id,
        email: talent.email,
        role: "TALENT",
        username: talent.fullName,
        talentId: talent.id,
        companyId: membership?.companyId,
        companyMember: !!membership,
    };

    // 5. Generate JWT
    const token = generateToken(payload);

    // 6. Strip sensitive info before returning
    const { password: _password, ...safe } = talent as any;

    return { token, user: safe };
};



// Dashboard functions
export const getTotalJobsApplied = async (talentId: string) => {
    const totalJobs = await prisma.jobApplication.count({
        where: { talentId }
    });
    return totalJobs;
};

export const getInterviewedCount = async (talentId: string) => {
    const interviewedCount = await prisma.jobApplication.count({
        where: {
            talentId,
            status: "interview"
        }
    });
    return interviewedCount;
};

export const getJobAppliedStatus = async (talentId: string) => {
    const applications = await prisma.jobApplication.groupBy({
        by: ['status'],
        where: { talentId },
        _count: {
            status: true
        }
    });

    const statusCounts = {
        interviewed: 0,
        rejected: 0,
        pending: 0,
        accepted: 0
    };

    applications.forEach(app => {
        if (app.status === 'interview') {
            statusCounts.interviewed = app._count.status;
        } else if (app.status === 'rejected') {
            statusCounts.rejected = app._count.status;
        } else if (app.status === 'pending') {
            statusCounts.pending = app._count.status;
        } else if (app.status === 'accepted') {
            statusCounts.accepted = app._count.status;
        }
    });

    return statusCounts;
};

export const getUpcomingInterviews = async (talentId: string) => {
    // Get applications with interview status and include job and company details
    const upcomingInterviews = await prisma.jobApplication.findMany({
        where: {
            talentId,
            status: "interview"
        },
        include: {
            job: {
                include: {
                    company: {
                        select: {
                            companyName: true,
                            logoUrl: true,
                            contactName: true,
                            contactJobTitle: true
                        }
                    }
                }
            }
        },
        orderBy: {
            appliedAt: 'asc'
        },
        take: 5 // Limit to 5 upcoming interviews
    });

    return upcomingInterviews.map(interview => ({
        id: interview.id,
        jobTitle: interview.job.title,
        companyName: interview.job.company.companyName,
        companyLogo: interview.job.company.logoUrl,
        contactName: interview.job.company.contactName,
        contactJobTitle: interview.job.company.contactJobTitle,
        appliedAt: interview.appliedAt,
        jobLocation: interview.job.location,
        jobEnvironment: interview.job.environmentType
    }));
};

export const getRecentApplicationsHistory = async (talentId: string, limit: number = 10) => {
    const recentApplications = await prisma.jobApplication.findMany({
        where: { talentId },
        include: {
            job: {
                include: {
                    company: {
                        select: {
                            companyName: true,
                            logoUrl: true
                        }
                    }
                }
            }
        },
        orderBy: {
            appliedAt: 'desc'
        },
        take: limit
    });

    return recentApplications.map(application => ({
        id: application.id,
        jobTitle: application.job.title,
        companyName: application.job.company.companyName,
        companyLogo: application.job.company.logoUrl,
        location: application.job.location,
        environmentType: application.job.environmentType,
        salaryType: application.job.salaryType,
        status: application.status,
        appliedAt: application.appliedAt
    }));
};

export const getTalentDashboardStats = async (talentId: string) => {
    const [
        totalJobsApplied,
        interviewedCount,
        jobStatusCounts,
        upcomingInterviews,
        recentApplications
    ] = await Promise.all([
        getTotalJobsApplied(talentId),
        getInterviewedCount(talentId),
        getJobAppliedStatus(talentId),
        getUpcomingInterviews(talentId),
        getRecentApplicationsHistory(talentId, 5)
    ]);

    return {
        totalJobsApplied,
        interviewedCount,
        jobStatusCounts,
        upcomingInterviews,
        recentApplications
    };
};

export const getTalentById = async (talentId: string) => {
    const talent = await prisma.talent.findUnique({
        where: { id: talentId },
        select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
            languages: true,
            linkedinUrl: true,
            personalWebsite: true,
            instagramUrl: true,
            locations: true,
            fieldOfStudy: true,
            program: true,
            workingEnvironment: true,
            bio: true,
            preferredRole: true,
            aboutMe: true,
            experiences: true,
            education: true,
            skills: true,
            gender: true,
            profileImageUrl: true,
            rating: true,
            address: true,
            yearsExperience: true,
            resumeUrl: true,
            availableForWork: true,
            settings: true,
            createdAt: true,
            updatedAt: true
        }
    });

    if (!talent) {
        throw new Error("Talent not found");
    }

    return talent;
};

export const updateTalent = async (talentId: string, data: any) => {
    const updated = await prisma.talent.update({
        where: { id: talentId },
        data,
        select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
            languages: true,
            linkedinUrl: true,
            personalWebsite: true,
            instagramUrl: true,
            locations: true,
            fieldOfStudy: true,
            program: true,
            workingEnvironment: true,
            bio: true,
            preferredRole: true,
            aboutMe: true,
            experiences: true,
            education: true,
            skills: true,
            gender: true,
            profileImageUrl: true,
            rating: true,
            address: true,
            yearsExperience: true,
            resumeUrl: true,
            availableForWork: true,
            settings: true,
            createdAt: true,
            updatedAt: true
        }
    });

    return updated;
};

export const updateBasicInfo = async (talentId: string, data: { fullName?: string; phoneNumber?: string; profileImageUrl?: string; gender?: string; dateOfBirth?: string; }) => {
    // Store dateOfBirth under settings to avoid schema migration
    const current = await prisma.talent.findUnique({ where: { id: talentId }, select: { settings: true } });
    const baseSettings = (current?.settings && typeof current.settings === 'object') ? current.settings as Record<string, any> : {} as Record<string, any>;
    const mergedSettings = data.dateOfBirth ? { ...baseSettings, dateOfBirth: normalizeToISODateString(data.dateOfBirth) } : undefined;
    const talent = await prisma.talent.update({
        where: { id: talentId },
        data: {
            fullName: data.fullName,
            profileImageUrl: data.profileImageUrl,
            phoneNumber: data.phoneNumber,
            gender: data.gender as any,
            settings: mergedSettings as any,
            birthday: data.dateOfBirth
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            profileImageUrl: true,
            gender: true,
            settings: true,
            updatedAt: true
        }
    });
    return talent;
};

export const updateEmail = async (talentId: string, email: string) => {
    // Ensure email is unique
    const existing = await prisma.talent.findUnique({ where: { email } });
    if (existing && existing.id !== talentId) {
        throw new Error("Email already in use");
    }
    const updated = await prisma.talent.update({
        where: { id: talentId },
        data: { email },
        select: { id: true, email: true, updatedAt: true }
    });
    return updated;
};

export const changePassword = async (talentId: string, oldPassword: string, newPassword: string) => {
    const user = await prisma.talent.findUnique({ where: { id: talentId } });
    if (!user) {
        throw new Error("Talent not found");
    }
    const ok = await verifyPassword(oldPassword, user.password);
    if (!ok) {
        throw new Error("Old password is incorrect");
    }
    const hashed = await hashPassword(newPassword);
    await prisma.talent.update({ where: { id: talentId }, data: { password: hashed } });
    return { success: true };
};

export const updateNotificationSettings = async (talentId: string, notifications: Record<string, boolean>) => {
    // Ensure a Settings row exists; if not, create it with defaults then update
    const existing = await prisma.settings.findUnique({ where: { talentId } });
    const data = {
        application: notifications.application,
        job: notifications.job,
        recommendation: notifications.recommendation,
        alert: notifications.alert
    };

    let settings;
    if (!existing) {
        settings = await prisma.settings.create({
            data: {
                talentId,
                application: data.application ?? true,
                job: data.job ?? true,
                recommendation: data.recommendation ?? true,
                alert: data.alert ?? true
            }
        });
    } else {
        settings = await prisma.settings.update({
            where: { talentId },
            data
        });
    }

    return { id: talentId, settings };
};
