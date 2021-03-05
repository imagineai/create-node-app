import { Joi } from 'express-validation';
import { commentStatusChoices } from 'server/utils/constants/fieldChoices';

const commentValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number(),
      message: Joi.string().max(512),
      submitted: Joi.date(),
      status: Joi.string().valid(...commentStatusChoices),
    }),
  },
  create: {
    body: Joi.object({
      id: Joi.number(),
      todo: Joi.number().required(),
      message: Joi.string().max(512),
      submitted: Joi.date(),
      status: Joi.string().valid(...commentStatusChoices),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
    body: Joi.object({
      message: Joi.string().max(512).required(),
      submitted: Joi.date().required(),
      status: Joi.string().valid(...commentStatusChoices).required(),
      todo: Joi.number().required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
    body: Joi.object({
      message: Joi.string().max(512),
      submitted: Joi.date(),
      status: Joi.string().valid(...commentStatusChoices),
      todo: Joi.number(),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
};

export { commentValidation };

