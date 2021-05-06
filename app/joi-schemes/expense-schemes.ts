import Joi from "joi";

export const addExpenseSchema = Joi.object({
  accountId: Joi.number().integer().min(1).required(),
  amount: Joi.number().integer().min(1).required(),
  reason: Joi.string().min(1).max(255).trim().required()
});

export const expenseSchema = Joi.object({
  expenseId: Joi.number().integer().min(1).required(),
  accountId: Joi.number().integer().min(1).required()
});
