import { AuthorizationCode } from "simple-oauth2";
import prisma from "../../utils/prisma";
import { verifyPassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";
import ENV from "../../config/env"
import { JwtUserPayload } from "@/types/User";



export const login = async (email: string, password: string) => {
  // Try to find in company
  const company = await prisma.company.findUnique({ where: { email } });
  let role: "TALENT" | "COMPANY" | "ADMIN" | null = null;
  let user: any = null;

  if (company) {
    role = "COMPANY";
    user = company;
  } else {
    // If not found in company, check talent
    const talent = await prisma.talent.findUnique({ where: { email } });
    if (talent) {
      role = "TALENT";
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

  // build JWT payload
  const payload: JwtUserPayload = {
    id: user.id,
    email: user.email,
    role,
    username: user.username,

    // extra fields
    talentId: role === "TALENT" ? user.id : undefined,
    companyId: role === "COMPANY" ? user.id : undefined,
    companyMember: false, // will check next
  };

  // If this is a talent, check if they are in CompanyMember
  if (role === "TALENT") {
    const membership = await prisma.companyMember.findFirst({
      where: { talentId: user.id, active: true },
    });

    if (membership) {
      payload.companyId = membership.companyId;
      payload.companyMember = true;
    }
  }

  if (role === "COMPANY") {
    payload.companyMember = true;
  }

  const token = generateToken(payload);
  const { password: _password, ...safe } = user as any;

  return { token, user: safe, role };
};


// Google OAuth client
export const googleClient = new AuthorizationCode({
  client: {
    id: ENV.GOOGLE_CLIENT_ID!,
    secret: ENV.GOOGLE_CLIENT_SECRET!,
  },
  auth: {
    authorizeHost: 'https://accounts.google.com',
    authorizePath: '/o/oauth2/v2/auth',
    tokenHost: 'https://www.googleapis.com',
    tokenPath: '/oauth2/v4/token'
  },
  options: {
    bodyFormat: "form",   // send body as form
    authorizationMethod: "body", // client_id & secret in body
  },
});

// GitHub OAuth client
export const githubClient = new AuthorizationCode({
  client: {
    id: process.env.GITHUB_CLIENT_ID!,
    secret: process.env.GITHUB_CLIENT_SECRET!,
  },
  auth: {
    tokenHost: "https://github.com",
    authorizePath: "/login/oauth/authorize",
    tokenPath: "/login/oauth/access_token",
  },
});

// Common helper
export const handleOAuthLogin = async (provider: "google" | "github", profile: any) => {
  const email = profile.email;
  let talent = await prisma.talent.findUnique({ where: { email } });
  let company = await prisma.company.findUnique({ where: { email } });

  if (!talent && !company) {
    // default: create talent
    talent = await prisma.talent.create({
      data: {
        fullName: profile.name || profile.login || "Unknown",
        email,
        password: "",
        profileImageUrl: profile.picture || profile.avatar_url,
      },
    });
  }

  const user = talent || company;
  const type = talent ? "talent" : "company";

  // build JWT payload
  const payload: JwtUserPayload = {
    id: user?.id || "",
    email: user?.email || "",
    role: talent ? "TALENT" : "COMPANY",
    username: user?.email,

    // extra fields
    talentId: talent ? user?.id : undefined,
    companyId: company ? user?.id : undefined,
    companyMember: false, // will check next
  };

  // If this is a talent, check if they are in CompanyMember
  if (talent && user) {
    const membership = await prisma.companyMember.findFirst({
      where: { talentId: user.id, active: true },
    });

    if (membership) {
      payload.companyId = membership.companyId;
      payload.companyMember = true;
    }
  }

  if (company) {
    payload.companyMember = true;
  }

  const token = generateToken(payload);
  const { password: _password, ...safe } = user as any;

  return { token, user: safe, type };
} 