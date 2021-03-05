import httpStatus, { UNSUPPORTED_MEDIA_TYPE } from 'http-status';
import { errors } from 'utils/constants/errors';
import { BaseError } from './BaseError';

class UnsupportedMediaType extends BaseError {
  constructor(message) {
    super(errors.unsupported_media_type, UNSUPPORTED_MEDIA_TYPE, message || httpStatus['415_MESSAGE']);
  }
}

export { UnsupportedMediaType };
