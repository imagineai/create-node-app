import { Router } from 'express';
import { validate } from 'express-validation';
import { PersonController } from 'server/controllers';
import { personValidation, options } from 'server/validations';

const router = Router();

router.post('/', validate(personValidation.create, options), PersonController.create);

export { router as createPersonRouter };

