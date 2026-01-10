import { Document, Model } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "admin" | "staff";
    createdAt?: Date;
    updatedAt?: Date;
    isValidPassword(candidatePassword: string): Promise<boolean>;
}
export declare const User: Model<IUser>;
//# sourceMappingURL=user.model.d.ts.map