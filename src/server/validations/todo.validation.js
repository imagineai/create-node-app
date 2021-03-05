import { Joi } from 'express-validation';

const todoValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number(),
      title: Joi.string().max(255),
      description: Joi.string().max(1024),
      dueDate: Joi.date(),
      done: Joi.boolean(),
    }),
  },
  create: {
    body: Joi.object({
      id: Joi.number(),
      assignee: Joi.number().required(),
      title: Joi.string().max(255).required(),
      description: Joi.string().max(1024),
      dueDate: Joi.date(),
      done: Joi.boolean(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
    body: Joi.object({
      title: Joi.string().max(255).required(),
      description: Joi.string().max(1024).required(),
      dueDate: Joi.date().required(),
      done: Joi.boolean().required(),
      assignee: Joi.number().required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
    body: Joi.object({
      title: Joi.string().max(255),
      description: Joi.string().max(1024),
      dueDate: Joi.date(),
      done: Joi.boolean(),
      assignee: Joi.number(),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().required(),
    }),
  },
};

export { todoValidation };

