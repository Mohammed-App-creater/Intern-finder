declare namespace Express {
  interface Request {
    user?: {
      id: string;
      email: string;
      role: "TALENT" | "COMPANY" | "ADMIN";
      username?: string;

      // extra fields for option 1
      talentId?: string;       // if this user is a talent
      companyId?: string;      // if this user belongs to a company
      companyMember?: boolean; // true if they are linked in CompanyMember
    };
  }
}