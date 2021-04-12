import { Person } from 'data/models';
import { NotFound } from 'server/utils/errors';

class CreatePersonRepository {
  static async create(email, firstname, lastname, lastLogin) {
    const person = await Person.create({
      email,
      firstname,
      lastname,
      lastLogin,
    });

    return person;
  }
}

export { CreatePersonRepository };
