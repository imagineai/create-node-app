import { CreatePersonRepository } from 'data/repositories';

class CreatePersonService {
  static create(email, firstname, lastname, lastLogin) {
    return CreatePersonRepository.create(email, firstname, lastname, lastLogin);
  }
}

export { CreatePersonService };
