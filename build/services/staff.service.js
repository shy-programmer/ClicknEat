import { Staff } from "../models/staff.model.js";
import { encode } from "../utils/jwt.js";
class StaffService {
    async signupStaff(StaffData) {
        const staff = await Staff.create(StaffData);
        const data = {
            id: staff._id.toString(),
            name: staff.name,
            email: staff.email,
            role: staff.role,
            isDeleted: staff.isDeleted,
        };
        const token = encode(data);
        return {
            data,
            token
        };
    }
    ;
    async loginStaff(StaffData) {
        const { email, password } = StaffData;
        if (!email || !password) {
            throw new Error("Email and Password are required");
        }
        const staff = await Staff.findOne({ email: email, isDeleted: false });
        if (!staff) {
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = await staff.isValidPassword(password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }
        const data = {
            id: staff._id.toString(),
            name: staff.name,
            email: staff.email,
            role: staff.role,
            isDeleted: staff.isDeleted,
        };
        const token = encode(data);
        return {
            data,
            token
        };
    }
    ;
    async getStaffById(staffId, auth) {
        if (auth.id !== staffId && auth.role !== "admin") {
            throw new Error("Access denied");
        }
        const staff = Staff.findOne({ _id: staffId, isDeleted: false });
        if (!staff) {
            throw new Error("Staff not found");
        }
        return staff;
    }
    ;
    async updateStaff(staffId, StaffData, auth) {
        if (auth.id !== staffId) {
            throw new Error("Access denied");
        }
        const updatedStaff = await Staff.findByIdAndUpdate(staffId, StaffData, { new: true });
        if (!updatedStaff) {
            throw new Error("Staff not found");
        }
        return updatedStaff;
    }
    ;
    async softDeleteStaff(staffId, auth) {
        if (auth.id !== staffId && auth.role !== "admin") {
            throw new Error("Access denied");
        }
        // Soft delete: Set isDeleted to true instead of removing the document
        const deletedStaff = Staff.findByIdAndUpdate(staffId, { isDeleted: true }, { new: true });
        if (!deletedStaff) {
            throw new Error("Staff not found");
        }
        return deletedStaff;
    }
    ;
    async restoreStaff(staffId, auth) {
        if (auth.id !== staffId && auth.role !== "admin") {
            throw new Error("Access denied");
        }
        // Restore: Set isDeleted to false
        const restoredStaff = Staff.findByIdAndUpdate(staffId, { isDeleted: false }, { new: true });
        if (!restoredStaff) {
            throw new Error("Staff not found");
        }
        return restoredStaff;
    }
    ;
    async hardDeleteStaff(staffId, auth) {
        if (auth.role !== "admin") {
            throw new Error("Access denied");
        }
        const deletedStaff = Staff.findByIdAndDelete(staffId);
        if (!deletedStaff) {
            throw new Error("Staff not found");
        }
        return deletedStaff;
    }
    ;
}
export const staffService = new StaffService();
//# sourceMappingURL=staff.service.js.map