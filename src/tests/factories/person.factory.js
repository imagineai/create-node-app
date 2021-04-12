import { random, datatype, date } from 'faker';
import { Person } from 'data/models';
import { dateToUTC } from 'server/utils/functions';

const buildPerson = async (personFks) => {
  let resPerson = {};

  resPerson.email = random.word().slice(0, 100);
  resPerson.firstname = random.word().slice(0, 100);
  resPerson.lastname = random.word().slice(0, 100);
  resPerson.lastLogin = date.past().toJSON();

  return resPerson;
};

const createPerson = async (fakePerson) => {
  const person = await Person.create(fakePerson);
  return person;
};

export { buildPerson, createPerson };
