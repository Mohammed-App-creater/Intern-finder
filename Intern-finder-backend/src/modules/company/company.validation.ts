import { z } from "zod";

export const RegisterStep1Schema = z.object({
    companyName: z.string().min(3, "Company name must be greater than 2 letters").nonempty("Company name is required"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RegisterStep2Schema = z.object({
    phone: z.string().refine((val) => !val || /^\+?[1-9]\d{1,14}$/.test(val), {
        message: "Invalid phone number",
    }).optional(),
    linkedinUrl: z.string().min(3, "LinkedIn URL is required"),
    websiteUrl: z.url(),
    headQuarter: z.string().min(1, "Headquarter is required"),
    branches: z.array(z.string()).optional(),
    industries: z.array(z.string()).min(1, "At least one industry is required"),
    logoUrl: z.url(),
    description: z.string().min(3, "Description is required"),
    techStack: z.array(z.string()).min(1, "At least one tech stack item is required"),
    contactName: z.string(),
    contactEmail: z.email("Invalid email address"),
    contactPhone: z.string().refine((val) => !val || /^\+?[1-9]\d{1,14}$/.test(val), {
        message: "Invalid phone number",
    }),
    contactJobTitle: z.string(),
    teamSize: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"]),
});

export const CompanyLoginSchema = z.object({
    email: z.email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const CompanyIdSchema = z.object({
    companyId: z.uuid("Invalid company ID"),
});

export const CompanyIdOptionalSchema = z.object({
    companyId: z.uuid("Invalid company ID here ").optional(),
});

export const GetAllCompaniesSchema = z.object({
    page: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().min(1, "Page must be at least 1")).default(() => 1),
    limit: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100")).default(() => 10),
    search: z.string().optional(),
    location: z.string().optional(),
    industries: z.string().transform((val) => val ? val.split(",").map(item => item.trim()) : []).optional(),
    teamSize: z.string().transform((val) => val ? val.split(",").map(item => item.trim()) : []).optional(),
    sortBy: z.enum(["companyName", "employeeCount", "createdAt"]).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const UpdateCompanySchema = z.object({
    companyName: z.string().min(3, "Company name must be greater than 2 letters").optional(),
    phone: z.string().refine((val) => !val || /^\+?[1-9]\d{1,14}$/.test(val), {
        message: "Invalid phone number",
    }).optional(),
    linkedinUrl: z.url().optional(),
    instagram: z.url(),
    websiteUrl: z.url(),
    employeeCount: z.string(),
    headQuarter: z.string().min(1, "Headquarter is required"),
    branches: z.array(z.string()).optional(),
    industries: z.array(z.string()).optional(),
    logoUrl: z.url().optional(),
    description: z.string().optional(),
    techStack: z.array(z.string()).min(1, "At least one tech stack item is required"),
    contactName: z.string(),
    contactEmail: z.email("Invalid email address"),
    contactPhone: z.string().refine((val) => !val || /^\+?[1-9]\d{1,14}$/.test(val), {
        message: "Invalid phone number",
    }),
    contactJobTitle: z.string(),
    teamSize: z.enum(["1-10", "11-50", "51-200", "201-500", "500+", "1000+", "2000+", "3000+", "4000+",]).optional(),
});



    export type RegisterStep1DTO = z.infer<typeof RegisterStep1Schema>;
    export type RegisterStep2DTO = z.infer<typeof RegisterStep2Schema>;
    export type CompanyLoginDTO = z.infer<typeof CompanyLoginSchema>;
    export type GetAllCompaniesDTO = z.infer<typeof GetAllCompaniesSchema>; 
