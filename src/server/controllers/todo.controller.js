import { CREATED } from 'http-status';
import { TodoService, PersonService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class TodoController {
  static async create(req, res, next) {
    try {
      const {
        id, title, description, dueDate, done, assignee
      } = req.body;
      const dbassignee = await PersonService.get(assignee);
      if (!dbassignee) {
        throw new NotFound(`Person ${ assignee } not found`);
      }
      const newTodo = await TodoService
        .create(id, title, description, dueDate, done, assignee);
      res.locals.status = CREATED;
      res.locals.data = newTodo;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const todo = await TodoService.get(id);
      if (!todo) {
        throw new NotFound(`Todo with primary key ${ id } not found`);
      }
      res.locals.data = todo;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allTodos = await TodoService.getAll(filters);
      res.locals.data = allTodos;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        title,description,dueDate,done,assignee,
      } = req.body;
      if (assignee && !await PersonService.get(assignee)) {
        throw new NotFound(`Person ${ assignee } not found`)
      }

      const updatedTodo = await TodoService.update(id, title, description, dueDate, done, assignee);
      if (!updatedTodo) {
        throw new NotFound(`Todo with primary key ${ id } not found`);
      }

      res.locals.data = updatedTodo;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const {
        title,description,dueDate,done,assignee,
      } = req.body;
      if (assignee && !await PersonService.get(assignee)) {
        throw new NotFound(`Person ${ assignee } not found`)
      }

      const updatedTodo = await TodoService.partialUpdate(id, title, description, dueDate, done, assignee);
      if (!updatedTodo) {
        throw new NotFound(`Todo with primary key ${ id } not found`);
      }

      res.locals.data = updatedTodo;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const todoDelete = await TodoService.destroy(id);
      if (!todoDelete) {
        throw new NotFound(`Todo with primary key ${ id } not found`);
      }
      res.locals.data = todoDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
};

export { TodoController };

