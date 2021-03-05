import httpStatus, { UNAUTHORIZED } from 'http-status';
import { errors } from 'utils/constants/errors';
import { BaseError } from './BaseError';

class Unauthorized extends BaseError {
  constructor(message) {
    super(errors.not_authenticated, UNAUTHORIZED, message || httpStatus['401_MESSAGE']);
  }
}

export { Unauthorized };
