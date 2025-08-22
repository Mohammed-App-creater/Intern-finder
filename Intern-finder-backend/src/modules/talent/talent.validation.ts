import { z } from "zod";

export const RegisterStep1Schema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterStep1DTO = z.infer<typeof RegisterStep1Schema>;