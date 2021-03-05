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
    const { todo: fakeTodo, assigneeDict, } = buildTodo();
    
    createPerson(assigneeDict);

    const response = await request(app)
      .post(ENDPOINT)
      .send(fakeTodo);
      
    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const todo = await Todo.findByPk(fakeTodo.id);

    expect(todo.id).toBe(fakeTodo.id);
    expect(todo.title).toBe(fakeTodo.title);
    expect(todo.description).toBe(fakeTodo.description);
    expect(todo.done).toBe(fakeTodo.done);
    expect(new Date(todo.dueDate).toUTCString()).toEqual(fakeTodo.dueDate.toUTCString());
    expect(todo.assignee).toBe(fakeTodo.assignee);
  });

  test('/POST -  does not exists, todo cant be created', async () => {
    const { todo: fakeTodo } = buildTodo();

    const response = await request(app)
      .post(ENDPOINT)
      .send(fakeTodo);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a todo', async () => {
    const todoDict = buildTodo();
    await createTodo(todoDict);
    const { todo: fakeTodo } = todoDict;

    const response = await request(app)
      .get(`${ENDPOINT}/${ fakeTodo.id }`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);
    
    expect(data.id).toBe(fakeTodo.id);
    expect(data.title).toBe(fakeTodo.title);
    expect(data.description).toBe(fakeTodo.description);
    expect(data.done).toBe(fakeTodo.done);
    expect(new Date(data.dueDate).toUTCString()).toEqual(fakeTodo.dueDate.toUTCString());
    expect(data.comments).toEqual([]);
    expect(data.assignee).toBe(fakeTodo.assignee);
  });

  test('/GET - Response with a todo not found', async () => {
    const { id } = await buildTodo();
    const response = await request(app).get(`${ENDPOINT}/${ id }`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  

  test('/GET - Response with a list of todos', async () => {
    const todoDict = buildTodo();
    await createTodo(todoDict);
    const { todo: fakeTodo } = todoDict;

    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.length).toBe(1);
    
    expect(data[0].id).toBe(fakeTodo.id);
    expect(data[0].title).toBe(fakeTodo.title);
    expect(data[0].description).toBe(fakeTodo.description);
    expect(data[0].done).toBe(fakeTodo.done);
    expect(new Date(data[0].dueDate).toUTCString()).toEqual(fakeTodo.dueDate.toUTCString());
    expect(data[0].comments).toEqual([]);
    expect(data[0].assignee).toBe(fakeTodo.assignee);
  });

  test('/PUT - Response with an updated todo', async () => {
    const todoDict = buildTodo();
    await createTodo(todoDict);
    const { todo: fakeTodo } = todoDict;

    const { todo: otherFakeTodo } = buildTodo();

    const response = await request(app)
      .put(`${ENDPOINT}/${ fakeTodo.id }`)
      .send({
        title: otherFakeTodo.title,
        description: otherFakeTodo.description,
        dueDate: otherFakeTodo.dueDate,
        done: otherFakeTodo.done,
        assignee: fakeTodo.assignee,
      });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.title).toBe(otherFakeTodo.title);
    expect(data.description).toBe(otherFakeTodo.description);
    expect(data.done).toBe(otherFakeTodo.done);
    expect(new Date(data.dueDate).toUTCString()).toEqual(otherFakeTodo.dueDate.toUTCString());

    const updatedTodo = await Todo.findByPk(fakeTodo.id);

    expect(updatedTodo.title).toBe(otherFakeTodo.title);
    expect(updatedTodo.description).toBe(otherFakeTodo.description);
    expect(updatedTodo.done).toBe(otherFakeTodo.done);
    expect(new Date(updatedTodo.dueDate).toUTCString()).toEqual(otherFakeTodo.dueDate.toUTCString());
  });

  test('/PUT -  does not exists, todo cant be updated', async () => {
    const todoDict = buildTodo();
    await createTodo(todoDict);
    const { todo: fakeTodo } = todoDict;

    const { person: anotherFakeAssignee } = buildPerson();
    const { id: assignee } = anotherFakeAssignee;

    const response = await request(app)
      .put(`${ENDPOINT}/${ fakeTodo.id }`)
      .send({
        title: fakeTodo.title,
        description: fakeTodo.description,
        dueDate: fakeTodo.dueDate,
        done: fakeTodo.done,
        assignee,
      });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - Todo does not exists, todo cant be updated', async () => {
    const { todo: fakeTodo } = buildTodo();

    const response = await request(app)
      .put(`${ENDPOINT}/${ fakeTodo.id }`)
      .send({
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
    const todoDict = buildTodo();
    await createTodo(todoDict);
    const { todo: fakeTodo } = todoDict;
    
    const { todo: anotherfakeTodo } = buildTodo();
    const { title } = anotherfakeTodo;

    const response = await request(app)
      .patch(`${ENDPOINT}/${ fakeTodo.id }`)
      .send({ title });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
    
    expect(data.title).toBe(title);

    const updatedTodo = await Todo.findByPk(fakeTodo.id);

    expect(updatedTodo.title).toBe(anotherfakeTodo.title);
    
  });

  test('/PATCH - assignee does not exists, todo cant be updated', async () => {
    const todoDict = buildTodo();
    await createTodo(todoDict);
    const { todo: fakeTodo } = todoDict;

    const { person: anotherFakeAssignee } = buildPerson();
    const { id: assignee } = anotherFakeAssignee;


    const response = await request(app)
      .patch(`${ENDPOINT}/${ fakeTodo.id }`)
      .send({ assignee });
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Todo does not exists, todo cant be updated', async () => {
    const { todo: fakeTodo } = buildTodo();
    
    const response = await request(app)
      .patch(`${ENDPOINT}/${ fakeTodo.id }`)
      .send({ title: fakeTodo.title });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  
  test('/DELETE - Response with a deleted todo', async () => {
    const todoDict = buildTodo();
    await createTodo(todoDict);
    const { todo: fakeTodo } = todoDict;

    const response = await request(app)
      .delete(`${ENDPOINT}/${ fakeTodo.id }`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(fakeTodo.name);

    const deletedTodo = await Todo.findByPk(fakeTodo.id);
    expect(deletedTodo).toBe(null);
  });
  
  test('/DELETE - Todo does not exists, todo cant be deleted', async () => {
    const { todo: fakeTodo } = buildTodo();
    const { id } = fakeTodo;

    const response = await request(app)
      .delete(`${ENDPOINT}/${ id }`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});

