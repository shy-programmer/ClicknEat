import { Document, Model } from "mongoose";
export interface IStaff extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "staff";
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    isValidPassword(candidatePassword: string): Promise<boolean>;
}
export declare const Staff: Model<IStaff>;
//# sourceMappingURL=staff.model.d.ts.map