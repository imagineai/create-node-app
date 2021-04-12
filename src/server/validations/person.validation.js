import { Joi } from 'express-validation';

const personValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      email: Joi.string().max(100),
      firstname: Joi.string().max(100),
      lastname: Joi.string().max(100),
      lastLogin: Joi.date(),
    }),
  },
  create: {
    body: Joi.object({
      email: Joi.string().max(100),
      firstname: Joi.string().max(100),
      lastname: Joi.string().max(100),
      lastLogin: Joi.date(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      email: Joi.string().max(100).required(),
      firstname: Joi.string().max(100).required(),
      lastname: Joi.string().max(100).required(),
      lastLogin: Joi.date().required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      email: Joi.string().max(100),
      firstname: Joi.string().max(100),
      lastname: Joi.string().max(100),
      lastLogin: Joi.date(),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { personValidation };
