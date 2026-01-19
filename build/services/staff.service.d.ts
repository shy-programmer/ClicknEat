import { IStaff } from "../models/staff.model.js";
import { payload } from "../utils/jwt.js";
declare class StaffService {
    signupStaff(StaffData: IStaff): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "staff";
            isDeleted: boolean;
        };
        token: string;
    }>;
    loginStaff(StaffData: IStaff): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "staff";
            isDeleted: boolean;
        };
        token: string;
    }>;
    getStaffById(staffId: string, auth: payload): Promise<(import("mongoose").Document<unknown, {}, IStaff, {}, import("mongoose").DefaultSchemaOptions> & IStaff & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    updateStaff(staffId: string, StaffData: IStaff, auth: payload): Promise<import("mongoose").Document<unknown, {}, IStaff, {}, import("mongoose").DefaultSchemaOptions> & IStaff & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    softDeleteStaff(staffId: string, auth: payload): Promise<(import("mongoose").Document<unknown, {}, IStaff, {}, import("mongoose").DefaultSchemaOptions> & IStaff & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    restoreStaff(staffId: string, auth: payload): Promise<(import("mongoose").Document<unknown, {}, IStaff, {}, import("mongoose").DefaultSchemaOptions> & IStaff & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    hardDeleteStaff(staffId: string, auth: payload): Promise<(import("mongoose").Document<unknown, {}, IStaff, {}, import("mongoose").DefaultSchemaOptions> & IStaff & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
export declare const staffService: StaffService;
export {};
//# sourceMappingURL=staff.service.d.ts.map