import httpStatus, { FORBIDDEN } from 'http-status';
import { errors } from 'utils/constants/errors';
import { BaseError } from './BaseError';

class Forbidden extends BaseError {
  constructor(message) {
    super(errors.permission_denied, FORBIDDEN, message || httpStatus['403_MESSAGE']);
  }
}

export { Forbidden };
