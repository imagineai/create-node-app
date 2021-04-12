import { Router } from 'express';
import { validate } from 'express-validation';
import { TodoController } from 'server/controllers';
import { todoValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(todoValidation.getAll, options), TodoController.getAll);

router.get('/:id', TodoController.get);

router.post('/', validate(todoValidation.create, options), TodoController.create);

router.put('/:id', validate(todoValidation.update, options), TodoController.update);

router.patch('/:id', validate(todoValidation.partialUpdate, options), TodoController.partialUpdate);

router.delete('/:id', validate(todoValidation.destroy, options), TodoController.destroy);

export { router as todoRouter };
