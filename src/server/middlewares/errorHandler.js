import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';
import { ValidationError as ExpressValidationError } from 'express-validation';
import { ValidationError as SequelizeValidationError } from 'sequelize';
import { BaseError } from 'utils/errors/BaseError';
import { createErrorResponse } from 'utils/functions';
import { errors } from 'utils/constants/errors';

const errorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res
      .status(err.statusCode)
      .json(createErrorResponse(err.statusCode, err.type, undefined, err.message));
  }

  if (err instanceof ExpressValidationError) {
    const param = Object.keys(err.details[0])[0];
    const msg = err.details[0][param];
    return res
      .status(err.statusCode)
      .json(createErrorResponse(err.statusCode, errors.validation, param, msg));
  }

  if (err instanceof SyntaxError) {
    return res
      .status(err.statusCode)
      .json(createErrorResponse(err.statusCode, errors.parse, undefined, err.message));
  }

  if (err instanceof SequelizeValidationError) {
    const param = err.fields[0];
    const msg = err.errors[0].message;
    return res
      .status(BAD_REQUEST)
      .json(createErrorResponse(BAD_REQUEST, errors.validation, param, msg));
  }

  return res
    .status(INTERNAL_SERVER_ERROR)
    .json(createErrorResponse(INTERNAL_SERVER_ERROR, errors.server, undefined, err.message));
};

export { errorHandler };
