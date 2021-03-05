import { OK } from 'http-status';

const initResLocalsHandler = (req, res, next) => {
  res.locals.status = OK;
  res.locals.data = null;
  return next();
};

export { initResLocalsHandler };
