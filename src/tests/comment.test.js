import request from 'supertest';
import { buildComment, buildTodo, createComment, createTodo } from './factories';
import { startDatabase } from './utils';
import { Comment, Todo } from 'data/models';
import { app } from 'server/app';

const ENDPOINT = '/comment';

describe('Comment tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created comment', async () => {
    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);

    const fakeComment = await buildComment({ todo: fakeTodo.id });

    const response = await request(app).post(ENDPOINT).send(fakeComment);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseComment = response.body.data;

    const comment = await Comment.findByPk(responseComment.id);

    expect(comment.message).toBe(fakeComment.message);
    expect(comment.submitted.toISOString()).toEqual(fakeComment.submitted);
    expect(comment.status).toBe(fakeComment.status);

    expect(comment.todo).toBe(fakeComment.todo);
  });

  test('/POST - todo does not exists, comment cant be created', async () => {
    const fakeComment = await buildComment({});
    const todo = await Todo.findOne({ where: { id: fakeComment.todo } });
    await todo.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeComment);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a comment', async () => {
    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);

    const commentDict = await buildComment({ todo: fakeTodo.id });
    const fakeComment = await createComment(commentDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeComment.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeComment.id);
    expect(data.message).toBe(fakeComment.message);
    expect(data.submitted).toBe(fakeComment.submitted.toISOString());
    expect(data.status).toBe(fakeComment.status);

    expect(data.todo).toBe(fakeComment.todo);
  });

  test('/GET - Response with a comment not found', async () => {
    const commentDict = await buildComment({});
    const fakeComment = await createComment(commentDict);
    const id = fakeComment.id;
    await fakeComment.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a list of comments', async () => {
    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);

    const commentDict = await buildComment({ todo: fakeTodo.id });
    const fakeComment = await createComment(commentDict);

    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allComment = await Comment.findAll();
    expect(data.length).toBe(allComment.length);
  });

  test('/PUT - Response with an updated comment', async () => {
    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);

    const commentDict = await buildComment({ todo: fakeTodo.id });
    const fakeComment = await createComment(commentDict);

    const anotherTodoDict = await buildTodo({});
    const anotherFakeTodo = await createTodo(anotherTodoDict);

    const anotherFakeComment = await buildComment({ todo: anotherFakeTodo.id });

    const response = await request(app).put(`${ENDPOINT}/${fakeComment.id}`).send({
      message: anotherFakeComment.message,
      submitted: anotherFakeComment.submitted,
      status: anotherFakeComment.status,
      todo: anotherFakeComment.todo,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.message).toBe(anotherFakeComment.message);
    expect(data.submitted).toBe(anotherFakeComment.submitted);
    expect(data.status).toBe(anotherFakeComment.status);

    expect(data.todo).toBe(anotherFakeComment.todo);

    const updatedComment = await Comment.findByPk(fakeComment.id);

    expect(updatedComment.message).toBe(anotherFakeComment.message);
    expect(updatedComment.submitted.toISOString()).toEqual(anotherFakeComment.submitted);
    expect(updatedComment.status).toBe(anotherFakeComment.status);

    expect(updatedComment.todo).toBe(anotherFakeComment.todo);
  });

  test('/PUT - todo does not exists, comment cant be updated', async () => {
    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);

    const commentDict = await buildComment({ todo: fakeTodo.id });
    const fakeComment = await createComment(commentDict);

    const anotherTodoDict = await buildTodo({});
    const anotherFakeTodo = await createTodo(anotherTodoDict);

    fakeComment.todo = anotherFakeTodo.id;

    await anotherFakeTodo.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeComment.id}`).send({
      message: fakeComment.message,
      submitted: fakeComment.submitted,
      status: fakeComment.status,
      todo: fakeComment.todo,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - Comment does not exists, comment cant be updated', async () => {
    const commentDict = await buildComment({});
    const fakeComment = await createComment(commentDict);
    const id = fakeComment.id;
    await fakeComment.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      message: fakeComment.message,
      submitted: fakeComment.submitted,
      status: fakeComment.status,
      todo: fakeComment.todo,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Response with an updated comment', async () => {
    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);

    const commentDict = await buildComment({ todo: fakeTodo.id });
    const fakeComment = await createComment(commentDict);

    const anotherTodoDict = await buildTodo({});
    const anotherFakeTodo = await createTodo(anotherTodoDict);

    const anotherFakeComment = await buildComment({ todo: anotherFakeTodo.id });

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeComment.id}`)
      .send({ message: anotherFakeComment.message });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.message).toBe(anotherFakeComment.message);

    const updatedComment = await Comment.findByPk(fakeComment.id);

    expect(updatedComment.message).toBe(anotherFakeComment.message);
  });

  test('/PATCH - todo does not exists, comment cant be updated', async () => {
    const commentDict = await buildComment({});
    const fakeComment = await createComment(commentDict);

    const todoDict = await buildTodo({});
    const fakeTodo = await createTodo(todoDict);

    const fakeTodoId = fakeTodo.id;
    await fakeTodo.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${fakeComment.id}`).send({
      todo: fakeTodoId,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Comment does not exists, comment cant be updated', async () => {
    const commentDict = await buildComment({});
    const fakeComment = await createComment(commentDict);
    const id = fakeComment.id;
    const message = fakeComment.message;
    await fakeComment.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${id}`).send({ message: message });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/DELETE - Response with a deleted comment', async () => {
    const commentDict = await buildComment({});
    const fakeComment = await createComment(commentDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeComment.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeComment.id);

    const deletedComment = await Comment.findByPk(fakeComment.id);
    expect(deletedComment).toBe(null);
  });

  test('/DELETE - Comment does not exists, comment cant be deleted', async () => {
    const commentDict = await buildComment({});
    const fakeComment = await createComment(commentDict);
    const id = fakeComment.id;
    await fakeComment.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
