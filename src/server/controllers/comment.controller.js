import { CREATED } from 'http-status';
import { CommentService, TodoService } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class CommentController {
  static async create(req, res, next) {
    try {
      const { message, submitted, status, todo } = req.body;
      if (todo !== null && typeof todo !== 'undefined') {
        const dbtodo = await TodoService.get(todo);
        if (!dbtodo) {
          throw new NotFound(`Todo ${todo} not found`);
        }
      }
      const newComment = await CommentService.create(message, submitted, status, todo);
      res.locals.status = CREATED;
      res.locals.data = newComment;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await CommentService.get(id);
      if (!comment) {
        throw new NotFound(`Comment with primary key ${id} not found`);
      }
      res.locals.data = comment;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allComments = await CommentService.getAll(filters);
      res.locals.data = allComments;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { message, submitted, status, todo } = req.body;
      if (todo !== null && typeof todo !== 'undefined') {
        if (!(await TodoService.get(todo))) {
          throw new NotFound(`Todo ${todo} not found`);
        }
      }

      const updatedComment = await CommentService.update(id, message, submitted, status, todo);
      if (!updatedComment) {
        throw new NotFound(`Comment with primary key ${id} not found`);
      }

      res.locals.data = updatedComment;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const { message, submitted, status, todo } = req.body;
      if (todo !== null && typeof todo !== 'undefined') {
        if (!(await TodoService.get(todo))) {
          throw new NotFound(`Todo ${todo} not found`);
        }
      }

      const updatedComment = await CommentService.partialUpdate(
        id,
        message,
        submitted,
        status,
        todo
      );
      if (!updatedComment) {
        throw new NotFound(`Comment with primary key ${id} not found`);
      }

      res.locals.data = updatedComment;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const commentDelete = await CommentService.destroy(id);
      if (!commentDelete) {
        throw new NotFound(`Comment with primary key ${id} not found`);
      }
      res.locals.data = commentDelete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export { CommentController };
