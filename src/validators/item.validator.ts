import { NextFunction, Request, Response } from "express";
import joi from "joi";

export const ValidateItem = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const schema = joi.object({
        name: joi.string().alphanum().required(),
        price: joi.number().required()
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