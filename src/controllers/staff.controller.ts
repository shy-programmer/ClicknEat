import { Request, Response } from "express";
import { staffService } from "../services/staff.service.js";
import { payload } from "../utils/jwt.js";

class StaffController {

  async signupStaff(req: Request, res: Response) {
    try {
      const token = await staffService.signupStaff(req.body);

      res.status(201).json({
        message: "Staff account created successfully",
        token
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  }


  async loginStaff(req: Request, res: Response) {
    try {
      const token = await staffService.loginStaff(req.body);

      res.status(200).json({
        message: "Login successful",
        token
      });
    } catch (error: any) {
      res.status(401).json({
        message: error.message
      });
    }
  }

  async getStaffById(req: Request, res: Response) {
    try {
      const { staffId } = req.params as { staffId: string };
      const auth = req.user as payload;

      const staff = await staffService.getStaffById(staffId, auth);

      res.status(200).json({
        data: staff
      });
    } catch (error: any) {
      res.status(403).json({
        message: error.message
      });
    }
  }

  async updateStaff(req: Request, res: Response) {
    try {
      const { staffId } = req.params as { staffId: string };
      const auth = req.user as payload;

      const updatedStaff = await staffService.updateStaff(
        staffId,
        req.body,
        auth
      );

      res.status(200).json({
        message: "Staff updated successfully",
        data: updatedStaff
      });
    } catch (error: any) {
      res.status(403).json({
        message: error.message
      });
    }
  }


  async softDeleteStaff(req: Request, res: Response) {
    try {
      const { staffId } = req.params as { staffId: string };
      const auth = req.user as payload;

      const staff = await staffService.softDeleteStaff(staffId, auth);

      res.status(200).json({
        message: "Staff soft-deleted successfully",
        data: staff
      });
    } catch (error: any) {
      res.status(403).json({
        message: error.message
      });
    }
  }


  async restoreStaff(req: Request, res: Response) {
    try {
      const { staffId } = req.params as { staffId: string };
      const auth = req.user as payload;

      const staff = await staffService.restoreStaff(staffId, auth);

      res.status(200).json({
        message: "Staff restored successfully",
        data: staff
      });
    } catch (error: any) {
      res.status(403).json({
        message: error.message
      });
    }
  }


  async hardDeleteStaff(req: Request, res: Response) {
    try {
      const { staffId } = req.params as { staffId: string };
      const auth = req.user as payload;

      const staff = await staffService.hardDeleteStaff(staffId, auth);

      res.status(200).json({
        message: "Staff permanently deleted",
        data: staff
      });
    } catch (error: any) {
      res.status(403).json({
        message: error.message
      });
    }
  }
}

export default new StaffController();
