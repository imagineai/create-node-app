import httpStatus, { TOO_MANY_REQUESTS } from 'http-status';
import { errors } from 'utils/constants/errors';
import { BaseError } from './BaseError';

class Throttled extends BaseError {
  constructor(message) {
    super(errors.throttled, TOO_MANY_REQUESTS, message || httpStatus['429_MESSAGE']);
  }
}

export { Throttled };
