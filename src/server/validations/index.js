import { commentValidation } from './comment.validation';
import { createPersonValidation } from './createPerson.validation';
import { personValidation } from './person.validation';
import { todoValidation } from './todo.validation';

const options = { keyByField: true };

export { todoValidation, commentValidation, personValidation, createPersonValidation, options };
