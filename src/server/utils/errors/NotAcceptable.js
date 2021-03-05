import httpStatus, { NOT_ACCEPTABLE } from 'http-status';
import { errors } from 'utils/constants/errors';
import { BaseError } from './BaseError';

class NotAcceptable extends BaseError {
  constructor(message) {
    super(errors.not_acceptable, NOT_ACCEPTABLE, message || httpStatus['406_MESSAGE']);
  }
}

export { NotAcceptable };
