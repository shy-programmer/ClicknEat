import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff"], default: "staff" },
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    catch (err) {
        next(err);
    }
});
userSchema.methods.isValidPassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
export const User = mongoose.model("User", userSchema);
//# sourceMappingURL=user.model.js.map