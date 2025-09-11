import { Request, Response, NextFunction } from "express";
import { decodeToken } from '../utils/jwt'

export interface AuthRequest extends Request {
  user?: { id: string, role: "TALENT" | "COMPANY" | "ADMIN", email: string }; // decoded token payload
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = decodeToken(token);
    if (decoded && typeof decoded === 'object' && 'id' in decoded && typeof (decoded as any).id === 'string') {
      req.user = { id: (decoded as any).id, role: (decoded as any).role, email: (decoded as any).email }; // attach user info to request
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized: Invalid token payload" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
