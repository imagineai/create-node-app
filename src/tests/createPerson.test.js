import request from 'supertest';
import { buildPerson, createPerson } from './factories';
import { startDatabase } from './utils';
import { Person } from 'data/models';
import { app } from 'server/app';

const ENDPOINT = '/create_person';

describe('CreatePerson tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created person', async () => {
    const fakePerson = await buildPerson({});

    const response = await request(app).post(ENDPOINT).send(fakePerson);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responsePerson = response.body.data;

    const person = await Person.findByPk(responsePerson.id);

    expect(person.email).toBe(fakePerson.email);
    expect(person.firstname).toBe(fakePerson.firstname);
    expect(person.lastname).toBe(fakePerson.lastname);
    expect(person.lastLogin.toISOString()).toEqual(fakePerson.lastLogin);
  });
});
