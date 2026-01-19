import { staffService } from "../services/staff.service.js";
class StaffController {
    async signupStaff(req, res) {
        try {
            const { token, data } = await staffService.signupStaff(req.body);
            res.status(201).json({
                message: "Staff account created successfully",
                token,
                data
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
    async loginStaff(req, res) {
        try {
            const { token, data } = await staffService.loginStaff(req.body);
            res.status(200).json({
                message: "Login successful",
                token,
                data
            });
        }
        catch (error) {
            res.status(401).json({
                message: error.message
            });
        }
    }
    async getStaffById(req, res) {
        try {
            const { staffId } = req.params;
            const auth = req.user;
            const staff = await staffService.getStaffById(staffId, auth);
            res.status(200).json({
                data: staff
            });
        }
        catch (error) {
            res.status(403).json({
                message: error.message
            });
        }
    }
    async updateStaff(req, res) {
        try {
            const { staffId } = req.params;
            const auth = req.user;
            const updatedStaff = await staffService.updateStaff(staffId, req.body, auth);
            res.status(200).json({
                message: "Staff updated successfully",
                data: updatedStaff
            });
        }
        catch (error) {
            res.status(403).json({
                message: error.message
            });
        }
    }
    async softDeleteStaff(req, res) {
        try {
            const { staffId } = req.params;
            const auth = req.user;
            const staff = await staffService.softDeleteStaff(staffId, auth);
            res.status(200).json({
                message: "Staff soft-deleted successfully",
                data: staff
            });
        }
        catch (error) {
            res.status(403).json({
                message: error.message
            });
        }
    }
    async restoreStaff(req, res) {
        try {
            const { staffId } = req.params;
            const auth = req.user;
            const staff = await staffService.restoreStaff(staffId, auth);
            res.status(200).json({
                message: "Staff restored successfully",
                data: staff
            });
        }
        catch (error) {
            res.status(403).json({
                message: error.message
            });
        }
    }
    async hardDeleteStaff(req, res) {
        try {
            const { staffId } = req.params;
            const auth = req.user;
            const staff = await staffService.hardDeleteStaff(staffId, auth);
            res.status(200).json({
                message: "Staff permanently deleted",
                data: staff
            });
        }
        catch (error) {
            res.status(403).json({
                message: error.message
            });
        }
    }
}
export default new StaffController();
//# sourceMappingURL=staff.controller.js.map