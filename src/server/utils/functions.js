const createErrorResponse = (statusCode, type, param, message) => ({
  status_code: statusCode,
  type,
  param,
  message,
});

const createSuccessResponse = (statusCode, data) => ({ status_code: statusCode, data });

const getRandomValueFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export {
  createErrorResponse,
  createSuccessResponse,
  getRandomValueFromArray,
};
