import request from 'supertest';
import { buildTodo, buildPerson, createTodo, createPerson } from './factories';
import { startDatabase } from './utils';
import { Todo, Person } from 'data/models';
import { app } from 'server/app';

const ENDPOINT = '/todo';

describe('Todo tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created todo', async () => {
    const assigneeDict = await buildPerson({});
    const fakeAssignee = await createPerson(assigneeDict);

    const fakeTodo = await buildTodo({ assignee: fakeAssignee.id });

    const response = await request(app).post(ENDPOINT).send(fakeTodo);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseTodo = response.body.data;

    const todo = await Todo.findByPk(responseTodo.id);

    expect(todo.title).toBe(fakeTodo.title);
    expect(todo.description).toBe(fakeTodo.description);
    expect(todo.dueDate.toISOString()).toEqual(fakeTodo.dueDate);
    expect(todo.done).toBe(fakeTodo.done);

    expect(todo.assignee).toBe(fakeTodo.assignee);
  });

  test('/POST - assignee does not exists, todo cant be created', async () => {
    const fakeTodo = await buildTodo({});
    const assignee = await Person.findOne({ where: { id: fakeTodo.assignee } });
    await assignee.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeTodo);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a todo', async () => {
    const assigneeDict = await buildPerson({});
    const fakeAssignee = await createPerson(assigneeDict);

    const todoDict = await buildTodo({ assignee: fakeAssignee.id });
    const fakeTodo = await createTodo(todoDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeTodo.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeTodo.id);
    expect(data.title).toBe(fakeTodo.title);
    expect(data.description).toBe(fakeTodo.description);
    expect(data.dueDate).toBe(fakeTodo.dueDate.toISOString());
    expect(data.done).toBe(fakeTodo.done);

    expect(data.comments).toEqual([]);
    expect(data.assignee).toBe(fakeTodo.assignee);
  });

  test('/GET - Response with a todo not found', async () => {
    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);
    const id = fakeTodo.id;
    await fakeTodo.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a list of todos', async () => {
    const assigneeDict = await buildPerson({});
    const fakeAssignee = await createPerson(assigneeDict);

    const todoDict = await buildTodo({ assignee: fakeAssignee.id });
    const fakeTodo = await createTodo(todoDict);

    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allTodo = await Todo.findAll();
    expect(data.length).toBe(allTodo.length);
  });

  test('/PUT - Response with an updated todo', async () => {
    const assigneeDict = await buildPerson({});
    const fakeAssignee = await createPerson(assigneeDict);

    const todoDict = await buildTodo({ assignee: fakeAssignee.id });
    const fakeTodo = await createTodo(todoDict);

    const anotherAssigneeDict = await buildPerson({});
    const anotherFakeAssignee = await createPerson(anotherAssigneeDict);

    const anotherFakeTodo = await buildTodo({ assignee: anotherFakeAssignee.id });

    const response = await request(app).put(`${ENDPOINT}/${fakeTodo.id}`).send({
      title: anotherFakeTodo.title,
      description: anotherFakeTodo.description,
      dueDate: anotherFakeTodo.dueDate,
      done: anotherFakeTodo.done,
      assignee: anotherFakeTodo.assignee,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.title).toBe(anotherFakeTodo.title);
    expect(data.description).toBe(anotherFakeTodo.description);
    expect(data.dueDate).toBe(anotherFakeTodo.dueDate);
    expect(data.done).toBe(anotherFakeTodo.done);

    expect(data.assignee).toBe(anotherFakeTodo.assignee);

    const updatedTodo = await Todo.findByPk(fakeTodo.id);

    expect(updatedTodo.title).toBe(anotherFakeTodo.title);
    expect(updatedTodo.description).toBe(anotherFakeTodo.description);
    expect(updatedTodo.dueDate.toISOString()).toEqual(anotherFakeTodo.dueDate);
    expect(updatedTodo.done).toBe(anotherFakeTodo.done);

    expect(updatedTodo.assignee).toBe(anotherFakeTodo.assignee);
  });

  test('/PUT - assignee does not exists, todo cant be updated', async () => {
    const assigneeDict = await buildPerson({});
    const fakeAssignee = await createPerson(assigneeDict);

    const todoDict = await buildTodo({ assignee: fakeAssignee.id });
    const fakeTodo = await createTodo(todoDict);

    const anotherAssigneeDict = await buildPerson({});
    const anotherFakeAssignee = await createPerson(anotherAssigneeDict);

    fakeTodo.assignee = anotherFakeAssignee.id;

    await anotherFakeAssignee.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeTodo.id}`).send({
      title: fakeTodo.title,
      description: fakeTodo.description,
      dueDate: fakeTodo.dueDate,
      done: fakeTodo.done,
      assignee: fakeTodo.assignee,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - Todo does not exists, todo cant be updated', async () => {
    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);
    const id = fakeTodo.id;
    await fakeTodo.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      title: fakeTodo.title,
      description: fakeTodo.description,
      dueDate: fakeTodo.dueDate,
      done: fakeTodo.done,
      assignee: fakeTodo.assignee,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Response with an updated todo', async () => {
    const assigneeDict = await buildPerson({});
    const fakeAssignee = await createPerson(assigneeDict);

    const todoDict = await buildTodo({ assignee: fakeAssignee.id });
    const fakeTodo = await createTodo(todoDict);

    const anotherAssigneeDict = await buildPerson({});
    const anotherFakeAssignee = await createPerson(anotherAssigneeDict);

    const anotherFakeTodo = await buildTodo({ assignee: anotherFakeAssignee.id });

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeTodo.id}`)
      .send({ title: anotherFakeTodo.title });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.title).toBe(anotherFakeTodo.title);

    const updatedTodo = await Todo.findByPk(fakeTodo.id);

    expect(updatedTodo.title).toBe(anotherFakeTodo.title);
  });

  test('/PATCH - assignee does not exists, todo cant be updated', async () => {
    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);

    const assigneeDict = await buildPerson({});
    const fakeAssignee = await createPerson(assigneeDict);

    const fakeAssigneeId = fakeAssignee.id;
    await fakeAssignee.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${fakeTodo.id}`).send({
      assignee: fakeAssigneeId,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Todo does not exists, todo cant be updated', async () => {
    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);
    const id = fakeTodo.id;
    const title = fakeTodo.title;
    await fakeTodo.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${id}`).send({ title: title });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/DELETE - Response with a deleted todo', async () => {
    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeTodo.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeTodo.id);

    const deletedTodo = await Todo.findByPk(fakeTodo.id);
    expect(deletedTodo).toBe(null);
  });

  test('/DELETE - Todo does not exists, todo cant be deleted', async () => {
    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);
    const id = fakeTodo.id;
    await fakeTodo.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
