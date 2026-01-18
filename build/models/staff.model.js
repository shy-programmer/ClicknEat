import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const staffSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff"], default: "staff" },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });
staffSchema.pre("save", async function () {
    if (!this.isModified("password"))
        return; //next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        //next();
    }
    catch (err) {
        //next(err as any);
    }
});
staffSchema.methods.isValidPassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
export const Staff = mongoose.model("Staff", staffSchema);
//# sourceMappingURL=staff.model.js.map