import { commentValidation } from './comment.validation';
import { personValidation } from './person.validation';
import { todoValidation } from './todo.validation';

const options = { keyByField: true };

export {
  todoValidation,
  commentValidation,
  personValidation,
  options,
};
