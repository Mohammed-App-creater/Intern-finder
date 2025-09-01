import { RegisterStep1DTO, RegisterStep2DTO } from "./talent.types";
import prisma from "../../utils/prisma";

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
            password: data.password, // Make sure to hash password in production
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
    return talent;
};
