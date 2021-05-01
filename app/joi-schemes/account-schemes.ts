import Joi from "joi";

export const createAccountSchema = Joi.object({
  bankName: Joi.string().min(3).max(200).trim().required(),
  accountNumber: Joi.string()
    .regex(/[0-9]{10,200}/)
    .trim()
    .required()
});
