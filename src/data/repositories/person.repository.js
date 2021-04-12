import { Person } from 'data/models';
import { NotFound } from 'server/utils/errors';

class PersonRepository {
  static async create(email, firstname, lastname, lastLogin) {
    const person = await Person.create({
      email,
      firstname,
      lastname,
      lastLogin,
    });

    return person;
  }

  static get(id) {
    return Person.findByPk(id, { include: ['todos'] });
  }

  static getAll(filters) {
    return Person.findAll({
      where: filters,
      include: ['todos'],
    });
  }

  static async update(id, email, firstname, lastname, lastLogin) {
    return this.partialUpdate({
      id,
      email,
      firstname,
      lastname,
      lastLogin,
    });
  }

  static async partialUpdate({ id, email, firstname, lastname, lastLogin }) {
    const person = await Person.findByPk(id);
    if (!person) throw new NotFound(`Person with primary key ${id} not found`);
    if (email !== undefined) person.email = email;
    if (firstname !== undefined) person.firstname = firstname;
    if (lastname !== undefined) person.lastname = lastname;
    if (lastLogin !== undefined) person.lastLogin = lastLogin;
    await person.save();
    return person.reload();
  }

  static async destroy(id) {
    const person = await Person.findByPk(id);
    if (!person) throw new NotFound(`Person with primary key ${id} not found`);
    await person.destroy();
    return person;
  }
}

export { PersonRepository };
