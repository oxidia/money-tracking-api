import Joi from "joi";

export const addIncomeSchema = Joi.object({
  accountId: Joi.number().integer().min(1).required(),
  amount: Joi.number().integer().min(1).required(),
  source: Joi.string().min(1).max(255).trim().required()
});

export const incomeSchema = Joi.object({
  incomeId: Joi.number().integer().min(1).required(),
  accountId: Joi.number().integer().min(1).required()
});
