import { MethodNotAllowed } from '../utils/errors';

const methodNotAllowedHandler = () => {
  throw new MethodNotAllowed();
};

export { methodNotAllowedHandler };
