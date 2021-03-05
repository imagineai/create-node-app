import { createSuccessResponse } from 'utils/functions';

const responseHandler = (req, res, next) => {
  if (res.locals.data) {
    return res
      .status(res.locals.status)
      .json(createSuccessResponse(res.locals.status, res.locals.data));
  }
  return next();
};

export { responseHandler };
