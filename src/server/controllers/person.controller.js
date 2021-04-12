import { CREATED } from 'http-status';
import { PersonService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class PersonController {
  static async create(req, res, next) {
    try {
      const { email, firstname, lastname, lastLogin } = req.body;
      const newPerson = await PersonService.create(email, firstname, lastname, lastLogin);
      res.locals.status = CREATED;
      res.locals.data = newPerson;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const person = await PersonService.get(id);
      if (!person) {
        throw new NotFound(`Person with primary key ${id} not found`);
      }
      res.locals.data = person;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allPersons = await PersonService.getAll(filters);
      res.locals.data = allPersons;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { email, firstname, lastname, lastLogin } = req.body;

      const updatedPerson = await PersonService.update(id, email, firstname, lastname, lastLogin);
      if (!updatedPerson) {
        throw new NotFound(`Person with primary key ${id} not found`);
      }

      res.locals.data = updatedPerson;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { email, firstname, lastname, lastLogin } = req.body;

      const updatedPerson = await PersonService.partialUpdate(
        id,
        email,
        firstname,
        lastname,
        lastLogin
      );
      if (!updatedPerson) {
        throw new NotFound(`Person with primary key ${id} not found`);
      }

      res.locals.data = updatedPerson;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const personDelete = await PersonService.destroy(id);
      if (!personDelete) {
        throw new NotFound(`Person with primary key ${id} not found`);
      }
      res.locals.data = personDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { PersonController };
