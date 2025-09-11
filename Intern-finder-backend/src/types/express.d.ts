declare namespace Express {
  interface Request {
    user?: {
      id: string;
        email: string;
        role: "TALENT" | "COMPANY" | "ADMIN";
        username?: string;
    };
  }
}