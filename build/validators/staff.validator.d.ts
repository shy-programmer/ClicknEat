import { NextFunction, Request, Response } from "express";
export declare const ValidateNewUser: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const ValidateLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=staff.validator.d.ts.map