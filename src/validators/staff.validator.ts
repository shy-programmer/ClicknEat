import { NextFunction, Request, Response } from "express";
import {Staff} from "../models/staff.model.js"
import joi from "joi";

export const ValidateNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const schema = joi.object({
        name: joi.string().alphanum().min(3).max(30).required(),
        email: joi.string().min(6).required(),
        password: joi.string().min(6).required(),
        role: joi.string().valid('admin', 'staff')
    });
    try {
        await schema.validateAsync(req.body);
        const existingEmail = await Staff.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        next();
    }
    catch (error) {
            const validationError = error as joi.ValidationError;
            res.status(400).json({ message: validationError.details ? validationError.details[0]!.message : 'Validation error' });
        }
};

export const ValidateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const schema = joi.object({
        name: joi.string().alphanum().min(3).max(30),
        email: joi.string().min(6),
        password: joi.string().min(6),
        role: joi.string().valid('admin', 'staff')
    });
    try {
        await schema.validateAsync(req.body);
        next();
    }
    catch (error) {
            const validationError = error as joi.ValidationError;
            res.status(400).json({ message: validationError.details ? validationError.details[0]!.message : 'Validation error' });
        }
};