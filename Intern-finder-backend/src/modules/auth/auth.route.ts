import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";
import { jwt } from "zod/v4/classic/external.cjs";
import { hashPassword, verifyPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";
import { errorResponse, successResponse } from "@/utils/response";
import { validate } from "@/middlewares/validate";
import { z } from "zod";


const router = Router();


export const login = async (email: string, password: string) => {
  // Try to find in company
  const company = await prisma.company.findUnique({ where: { email } });
  let role: "company" | "talent" | null = null;
  let user: any = null;

  if (company) {
    role = "company";
    user = company;
  } else {
    // If not found in company, check talent
    const talent = await prisma.talent.findUnique({ where: { email } });
    if (talent) {
      role = "talent";
      user = talent;
    }
  }

  if (!user || !role) {
    throw new Error("Invalid email or password");
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id); // include role in token
  const { password: _password, ...safe } = user as any;

  return { token, user: safe, role };
};



export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json(successResponse(result));
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}

export const LoginSchema = z.object({
    email: z.email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

router.post("/login", validate(LoginSchema), loginController);

export default router;