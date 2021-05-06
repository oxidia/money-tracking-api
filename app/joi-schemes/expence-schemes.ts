import Joi from "joi";

export const addExpenceSchema = Joi.object({
  accountId: Joi.number().integer().min(1).required(),
  amount: Joi.number().integer().min(1).required(),
  reason: Joi.string().min(1).max(255).trim().required()
});
