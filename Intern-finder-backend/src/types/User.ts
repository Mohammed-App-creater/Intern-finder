

export interface JwtUserPayload {
  id: string;
  email: string;
  role: "TALENT" | "COMPANY" | "ADMIN";
  username?: string;
  talentId?: string;
  companyId?: string;
  companyMember?: boolean;
  exp?: number; // expiration time as a Unix timestamp
}

