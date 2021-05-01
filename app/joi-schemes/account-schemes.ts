import Joi from "joi";

export const createAccountSchema = Joi.object({
  bankName: Joi.string().min(3).max(200).required(),
  accountNumber: Joi.string().min(10).max(200).required()
});
