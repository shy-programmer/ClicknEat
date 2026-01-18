import { Request, Response } from "express";
declare class StaffController {
    signupStaff(req: Request, res: Response): Promise<void>;
    loginStaff(req: Request, res: Response): Promise<void>;
    getStaffById(req: Request, res: Response): Promise<void>;
    updateStaff(req: Request, res: Response): Promise<void>;
    softDeleteStaff(req: Request, res: Response): Promise<void>;
    restoreStaff(req: Request, res: Response): Promise<void>;
    hardDeleteStaff(req: Request, res: Response): Promise<void>;
}
declare const _default: StaffController;
export default _default;
//# sourceMappingURL=staff.controller.d.ts.map