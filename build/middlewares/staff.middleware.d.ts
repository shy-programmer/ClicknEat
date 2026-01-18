import { Request, Response, NextFunction } from 'express';
import { payload } from '../utils/jwt.js';
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
export declare const AuthenticateStaff: (req: Request, res: Response, next: NextFunction) => void;
export declare const AuthorizeAdmin: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=staff.middleware.d.ts.map