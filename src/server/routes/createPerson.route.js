import { Router } from 'express';
import { validate } from 'express-validation';
import { CreatePersonController } from 'server/controllers';
import { createPersonValidation, options } from 'server/validations';

const router = Router();

router.post('/', validate(createPersonValidation.create, options), CreatePersonController.create);

export { router as createPersonRouter };
