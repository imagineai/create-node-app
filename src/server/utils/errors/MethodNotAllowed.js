import httpStatus, { METHOD_NOT_ALLOWED } from 'http-status';
import { errors } from 'utils/constants/errors';
import { BaseError } from './BaseError';

class MethodNotAllowed extends BaseError {
  constructor(message) {
    super(errors.method_not_allowed, METHOD_NOT_ALLOWED, message || httpStatus['405_MESSAGE']);
  }
}

export { MethodNotAllowed };
