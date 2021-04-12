import { Router } from 'express';
import { validate } from 'express-validation';
import { CommentController } from 'server/controllers';
import { commentValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(commentValidation.getAll, options), CommentController.getAll);

router.get('/:id', CommentController.get);

router.post('/', validate(commentValidation.create, options), CommentController.create);

router.put('/:id', validate(commentValidation.update, options), CommentController.update);

router.patch(
  '/:id',
  validate(commentValidation.partialUpdate, options),
  CommentController.partialUpdate
);

router.delete('/:id', validate(commentValidation.destroy, options), CommentController.destroy);

export { router as commentRouter };
