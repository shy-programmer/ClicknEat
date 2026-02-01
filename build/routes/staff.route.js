import express from "express";
import staffController from "../controllers/staff.controller.js";
import { ValidateNewUser, ValidateLogin } from "../validators/staff.validator.js";
import { AuthenticateStaff } from "../middlewares/staff.middleware.js";
const router = express.Router();
router.post("/signup", ValidateNewUser, staffController.signupStaff);
router.post("/login", ValidateLogin, staffController.loginStaff);
router.get("/:staffId", AuthenticateStaff, staffController.getStaffById);
router.put("/:staffId", AuthenticateStaff, staffController.updateStaff);
router.patch("/:staffId/soft-delete", AuthenticateStaff, staffController.softDeleteStaff);
router.patch("/:staffId/restore", AuthenticateStaff, staffController.restoreStaff);
router.delete("/:staffId", AuthenticateStaff, staffController.hardDeleteStaff);
export default router;
//# sourceMappingURL=staff.route.js.map