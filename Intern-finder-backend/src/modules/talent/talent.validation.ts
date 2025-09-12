import { z } from "zod";

export const RegisterStep1Schema = z.object({
    fullName: z.string().min(3, "Full name mist be greater than 2 letters").nonempty("Full name is required"),
    email: z.email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RegisterStep2Schema = z.object({
    location: z.string().min(2, "Location is required"),
    phoneNumber: z.string().min(9, "Phone number is required"),
    institution: z.string().min(3, "Institution is required"),
    fieldOfStudy: z.string().min(3, "Field of study is required"),
    program: z.string().min(3, "Program is required"),
    workingEnvironment: z.string().min(3, "Working environment is required"),
    preferredRole: z.string().min(3, "Preferred role is required"),
    linkedinUrl: z.string().min(3, "LinkedIn URL is required"),
    bio: z.string().min(3, "Bio is required"),
})

export const TalentLoginSchema = z.object({
    email: z.email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const TalentIdSchema = z.object({
    talentId: z.uuid("Invalid talent ID")
});

export const DashboardLimitSchema = z.object({
    limit: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().min(1, "Limit must be at least 1").max(50, "Limit cannot exceed 50")).default(() => 10)
});

// Allow partial updates to a subset of editable profile fields
export const UpdateTalentSchema = z.object({
    fullName: z.string().min(3).optional(),
    phoneNumber: z.string().min(6).optional(),
    languages: z.array(z.string()).optional(),
    linkedinUrl: z.url().optional(),
    personalWebsite: z.url().optional(),
    instagramUrl: z.url().optional(),
    locations: z.string().optional(),
    fieldOfStudy: z.string().optional(),
    program: z.string().optional(),
    workingEnvironment: z.string().optional(),
    preferredRole: z.string().optional(),
    bio: z.string().optional(),
    aboutMe: z.string().optional(),
    experiences: z.string().optional(),
    education: z.any().optional(),
    skills: z.array(z.string()).optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    profileImageUrl: z.url().optional(),
    rating: z.number().optional(),
    address: z.string().optional(),
    yearsExperience: z.number().int().nonnegative().optional(),
    resumeUrl: z.url().optional(),
    availableForWork: z.boolean().optional(),
    settings: z.any().optional()
});

// Settings related schemas
export const UpdateBasicInfoSchema = z.object({
    fullName: z.string().min(3).optional(),
    profileImageUrl: z.string().url().optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    dateOfBirth: z.preprocess((val) => {
        if (typeof val === 'string') {
            // Accept YYYY-MM-DD strictly
            const m = /^\d{4}-\d{2}-\d{2}$/.test(val);
            return m ? val : undefined;
        }
        return undefined;
    }, z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional())
});

export const UpdateEmailSchema = z.object({
    email: z.email("Invalid email address").nonempty("Email is required")
});

export const ChangePasswordSchema = z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6)
});

export const UpdateNotificationSettingsSchema = z.object({
    application: z.boolean().optional(),
    job: z.boolean().optional(),
    recommendation: z.boolean().optional(),
    alert: z.boolean().optional()
});

export type RegisterStep1DTO = z.infer<typeof RegisterStep1Schema>;
export type RegisterStep2DTO = z.infer<typeof RegisterStep2Schema>;
export type TalentLoginDTO = z.infer<typeof TalentLoginSchema>;
export type DashboardLimitDTO = z.infer<typeof DashboardLimitSchema>;
export type UpdateTalentDTO = z.infer<typeof UpdateTalentSchema>;
export type UpdateBasicInfoDTO = z.infer<typeof UpdateBasicInfoSchema>;
export type UpdateEmailDTO = z.infer<typeof UpdateEmailSchema>;
export type ChangePasswordDTO = z.infer<typeof ChangePasswordSchema>;
export type UpdateNotificationSettingsDTO = z.infer<typeof UpdateNotificationSettingsSchema>;