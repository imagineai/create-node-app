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
    const { comment: fakeComment, todoDict } = buildComment();

    createTodo(todoDict);

    const response = await request(app).post(ENDPOINT).send(fakeComment);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const comment = await Comment.findByPk(fakeComment.id);

    expect(comment.id).toBe(fakeComment.id);
    expect(comment.message).toBe(fakeComment.message);
    expect(comment.status).toBe(fakeComment.status);
    expect(new Date(comment.submitted).toUTCString()).toEqual(fakeComment.submitted.toUTCString());
    expect(comment.todo).toBe(fakeComment.todo);
  });

  test('/POST -  does not exists, comment cant be created', async () => {
    const { comment: fakeComment } = buildComment();

    const response = await request(app).post(ENDPOINT).send(fakeComment);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a comment', async () => {
    const commentDict = buildComment();
    await createComment(commentDict);
    const { comment: fakeComment } = commentDict;

    const response = await request(app).get(`${ENDPOINT}/${fakeComment.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeComment.id);
    expect(data.message).toBe(fakeComment.message);
    expect(data.status).toBe(fakeComment.status);
    expect(new Date(data.submitted).toUTCString()).toEqual(fakeComment.submitted.toUTCString());
    expect(data.todo).toBe(fakeComment.todo);
  });

  test('/GET - Response with a comment not found', async () => {
    const { id } = await buildComment();
    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a list of comments', async () => {
    const commentDict = buildComment();
    await createComment(commentDict);
    const { comment: fakeComment } = commentDict;

    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.length).toBe(1);

    expect(data[0].id).toBe(fakeComment.id);
    expect(data[0].message).toBe(fakeComment.message);
    expect(data[0].status).toBe(fakeComment.status);
    expect(new Date(data[0].submitted).toUTCString()).toEqual(fakeComment.submitted.toUTCString());
    expect(data[0].todo).toBe(fakeComment.todo);
  });

  test('/PUT - Response with an updated comment', async () => {
    const commentDict = buildComment();
    await createComment(commentDict);
    const { comment: fakeComment } = commentDict;

    const { comment: otherFakeComment } = buildComment();

    const response = await request(app).put(`${ENDPOINT}/${fakeComment.id}`).send({
      message: otherFakeComment.message,
      submitted: otherFakeComment.submitted,
      status: otherFakeComment.status,
      todo: fakeComment.todo,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.message).toBe(otherFakeComment.message);
    expect(data.status).toBe(otherFakeComment.status);
    expect(new Date(data.submitted).toUTCString()).toEqual(
      otherFakeComment.submitted.toUTCString()
    );

    const updatedComment = await Comment.findByPk(fakeComment.id);

    expect(updatedComment.message).toBe(otherFakeComment.message);
    expect(updatedComment.status).toBe(otherFakeComment.status);
    expect(new Date(updatedComment.submitted).toUTCString()).toEqual(
      otherFakeComment.submitted.toUTCString()
    );
  });

  test('/PUT -  does not exists, comment cant be updated', async () => {
    const commentDict = buildComment();
    await createComment(commentDict);
    const { comment: fakeComment } = commentDict;

    const { todo: anotherFakeTodo } = buildTodo();
    const { id: todo } = anotherFakeTodo;

    const response = await request(app).put(`${ENDPOINT}/${fakeComment.id}`).send({
      message: fakeComment.message,
      submitted: fakeComment.submitted,
      status: fakeComment.status,
      todo,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - Comment does not exists, comment cant be updated', async () => {
    const { comment: fakeComment } = buildComment();

    const response = await request(app).put(`${ENDPOINT}/${fakeComment.id}`).send({
      message: fakeComment.message,
      submitted: fakeComment.submitted,
      status: fakeComment.status,
      todo: fakeComment.todo,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Response with an updated comment', async () => {
    const commentDict = buildComment();
    await createComment(commentDict);
    const { comment: fakeComment } = commentDict;

    const { comment: anotherfakeComment } = buildComment();
    const { message } = anotherfakeComment;

    const response = await request(app).patch(`${ENDPOINT}/${fakeComment.id}`).send({ message });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.message).toBe(message);

    const updatedComment = await Comment.findByPk(fakeComment.id);

    expect(updatedComment.message).toBe(anotherfakeComment.message);
  });

  test('/PATCH - todo does not exists, comment cant be updated', async () => {
    const commentDict = buildComment();
    await createComment(commentDict);
    const { comment: fakeComment } = commentDict;

    const { todo: anotherFakeTodo } = buildTodo();
    const { id: todo } = anotherFakeTodo;

    const response = await request(app).patch(`${ENDPOINT}/${fakeComment.id}`).send({ todo });
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - Comment does not exists, comment cant be updated', async () => {
    const { comment: fakeComment } = buildComment();

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeComment.id}`)
      .send({ message: fakeComment.message });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/DELETE - Response with a deleted comment', async () => {
    const commentDict = buildComment();
    await createComment(commentDict);
    const { comment: fakeComment } = commentDict;

    const response = await request(app).delete(`${ENDPOINT}/${fakeComment.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.name).toBe(fakeComment.name);

    const deletedComment = await Comment.findByPk(fakeComment.id);
    expect(deletedComment).toBe(null);
  });

  test('/DELETE - Comment does not exists, comment cant be deleted', async () => {
    const { comment: fakeComment } = buildComment();
    const { id } = fakeComment;

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
