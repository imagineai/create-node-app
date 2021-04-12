import { Todo } from 'data/models';
import { NotFound } from 'server/utils/errors';

class TodoRepository {
  static async create(title, description, dueDate, done, assignee) {
    const todo = await Todo.create({
      title,
      description,
      dueDate,
      done,
      assignee,
    });

    return todo;
  }

  static get(id) {
    return Todo.findByPk(id, { include: ['comments', 'assignee_'] });
  }

  static getAll(filters) {
    return Todo.findAll({
      where: filters,
      include: ['comments', 'assignee_'],
    });
  }

  static async update(id, title, description, dueDate, done, assignee) {
    return this.partialUpdate({
      id,
      title,
      description,
      dueDate,
      done,
      assignee,
    });
  }

  static async partialUpdate({ id, title, description, dueDate, done, assignee }) {
    const todo = await Todo.findByPk(id);
    if (!todo) throw new NotFound(`Todo with primary key ${id} not found`);
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    if (done !== undefined) todo.done = done;
    if (assignee !== undefined) todo.assignee = assignee;
    await todo.save();
    return todo.reload();
  }

  static async destroy(id) {
    const todo = await Todo.findByPk(id);
    if (!todo) throw new NotFound(`Todo with primary key ${id} not found`);
    await todo.destroy();
    return todo;
  }
}

export { TodoRepository };
