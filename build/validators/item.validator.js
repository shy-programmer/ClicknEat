import joi from "joi";
export const ValidateItem = async (req, res, next) => {
    const schema = joi.object({
        name: joi.string().alphanum().required(),
        price: joi.number().required()
    });
    try {
        await schema.validateAsync(req.body);
        next();
    }
    catch (error) {
        const validationError = error;
        res.status(400).json({ message: validationError.details ? validationError.details[0].message : 'Validation error' });
    }
};
//# sourceMappingURL=item.validator.js.map