import { CREATED } from 'http-status';
import { CreatePersonService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class CreatePersonController {
  static async create(req, res, next) {
    try {
      const { email, firstname, lastname, lastLogin } = req.body;
      const newCreatePerson = await CreatePersonService.create(
        email,
        firstname,
        lastname,
        lastLogin
      );
      res.locals.status = CREATED;
      res.locals.data = newCreatePerson;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { CreatePersonController };
