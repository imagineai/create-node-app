import { Joi } from 'express-validation';

const createPersonValidation = {
  create: {
    body: Joi.object({
      email: Joi.string().max(100),
      firstname: Joi.string().max(100),
      lastname: Joi.string().max(100),
      lastLogin: Joi.date(),
    }),
  },
};

export { createPersonValidation };
