import { Request, Response, NextFunction } from "express";




export const authorizeCompanyMember = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  const { companyId } = req.params;
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  // allow if user.isAdmin (global) OR user.companyId === companyId OR user.companies includes companyId
  if (user.role === 'COMPANY') return next();
  if (user.isAdmin) return next();
  if (user.companyId && user.companyId === companyId) return next();
  if (Array.isArray(user.companyIds) && user.companyIds.includes(companyId)) return next();

  return res.status(403).json({ error: "Forbidden: not a member of the company" });
};

export const authorizeCompanyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  const { companyId } = req.params;
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  // allow if user.isAdmin (global) OR user.companyId === companyId AND user.role === 'admin' OR user.companies includes companyId with role 'admin'
  if (user.isAdmin) return next();
  if (user.companyId && user.companyId === companyId && user.role === 'admin') return next();
  if (Array.isArray(user.companyIds) && user.companyIds.includes(companyId) && user.role === 'admin') return next();

  return res.status(403).json({ error: "Forbidden: not an admin of the company" });
};