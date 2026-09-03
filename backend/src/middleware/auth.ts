import { Request, Response, NextFunction } from 'express';

export type Role = 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN' | 'SUPER_ADMIN' | 'APPLICANT';

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  departmentId?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  // In institutional deployment, verify OAuth2 Bearer token or institutional session header
  const authHeader = req.headers.authorization;
  const roleHeader = (req.headers['x-campusiq-role'] as Role) || 'STUDENT';
  const userIdHeader = (req.headers['x-campusiq-user-id'] as string) || 'user_student_1';

  req.user = {
    id: userIdHeader,
    email: 'vignesh.cs22@nscet.org',
    name: 'Vignesh R.',
    role: roleHeader,
    departmentId: 'dept_cse',
  };

  next();
};

export const requireRole = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'Forbidden: Insufficient institutional role permissions',
        requiredRoles: allowedRoles,
        currentRole: req.user?.role || 'ANONYMOUS',
      });
      return;
    }
    next();
  };
};

