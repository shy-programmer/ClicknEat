import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "staff";
  createdAt?: Date;
  updatedAt?: Date;

  isValidPassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff"], default: "staff" },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return  //next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    //next();
  } catch (err) {
    //next(err as any);
  }
});

userSchema.methods.isValidPassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
