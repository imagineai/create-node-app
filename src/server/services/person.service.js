import { PersonRepository } from 'data/repositories';

class PersonService {
  static create(email, firstname, lastname, lastLogin) {
    return PersonRepository.create(email, firstname, lastname, lastLogin);
  }

  static get(id) {
    return PersonRepository.get(id);
  }

  static getAll(args) {
    return PersonRepository.getAll(args);
  }

  static update(id, email, firstname, lastname, lastLogin) {
    return PersonRepository.update(id, email, firstname, lastname, lastLogin);
  }

  static partialUpdate(id, email, firstname, lastname, lastLogin) {
    return PersonRepository.partialUpdate({ id, email, firstname, lastname, lastLogin });
  }

  static destroy(id) {
    return PersonRepository.destroy(id);
  }
}

export { PersonService };
