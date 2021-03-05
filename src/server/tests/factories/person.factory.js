import { random, date } from 'faker';
import { Person } from 'data/models';

const buildPerson = () => {

  return {
    person:
    {
      id: random.number(),
      email: random.word(100),
      firstname: random.word(100),
      lastname: random.word(100),
      lastLogin: date.past(),
    },
  };
};

const createPerson = async (fakeDict) => {
  const { person, } = fakeDict;
  
  await Person.create(person);
};

export { buildPerson, createPerson };

