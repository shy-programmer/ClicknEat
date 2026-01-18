import { Request, Response, NextFunction } from 'express';
import { payload, decode } from '../utils/jwt.js';

declare global {
  namespace Express {
    interface Request {
      user?: payload | {
        id: string;
        name: string;
        email: string;
        role: "admin" | "staff";
      };
    }
  }
}

export const AuthenticateStaff = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Not Authorized' });
        return;
    }
    try {
        const decoded = decode(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};



export const AuthorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};


