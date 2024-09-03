import Joi from "joi";

export const addBookSchema = Joi.object({
  isbn: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  isBorrowed: Joi.boolean().required().default(false),
});

export const editBookSchema = Joi.object({
  isbn: Joi.string(),
  title: Joi.string(),
  author: Joi.string(),
  isBorrowed: Joi.boolean(),
});
