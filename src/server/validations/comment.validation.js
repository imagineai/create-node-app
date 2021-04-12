import { Joi } from 'express-validation';
import { commentStatusChoices } from 'server/utils/constants/fieldChoices';

const commentValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      message: Joi.string().max(512),
      submitted: Joi.date(),
      status: Joi.string().valid(...commentStatusChoices),
    }),
  },
  create: {
    body: Joi.object({
      todo: Joi.number().integer().required(),
      message: Joi.string().max(512),
      submitted: Joi.date(),
      status: Joi.string().valid(...commentStatusChoices),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      message: Joi.string().max(512).required(),
      submitted: Joi.date().required(),
      status: Joi.string()
        .valid(...commentStatusChoices)
        .required(),
      todo: Joi.number().integer().required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      message: Joi.string().max(512),
      submitted: Joi.date(),
      status: Joi.string().valid(...commentStatusChoices),
      todo: Joi.number().integer(),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { commentValidation };
