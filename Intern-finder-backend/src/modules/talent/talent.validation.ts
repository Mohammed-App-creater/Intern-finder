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

export type RegisterStep1DTO = z.infer<typeof RegisterStep1Schema>;
export type RegisterStep2DTO = z.infer<typeof RegisterStep2Schema>;