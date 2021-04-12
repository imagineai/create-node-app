import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const createErrorResponse = (statusCode, type, param, message) => ({
  status_code: statusCode,
  type,
  param,
  message,
});

const createSuccessResponse = (statusCode, data) => ({ status_code: statusCode, data });

const getRandomValueFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const dateToUTC = (date) => dayjs.utc(date);

export { createErrorResponse, createSuccessResponse, getRandomValueFromArray, dateToUTC };
