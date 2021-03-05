import { Comment } from 'data/models';
import { NotFound } from 'server/utils/errors';

class CommentRepository {
  static create(id, message, submitted, status, todo) {
    return Comment.create({
      id, message, submitted, status, todo: todo,
    });
  }

  static get(id) {
    return Comment.findByPk(id,{ include: ['todo_'] });
  }

  static getAll(filters) {
    return Comment.findAll({
      where: filters,
      include: ['todo_'],
    });
  }

  static async update(id, message, submitted, status, todo) {
    return this.partialUpdate({
      id, message, submitted, status, todo
    });
  }

  static async partialUpdate({ id, message, submitted, status, todo }) {
    const comment = await Comment.findByPk(id);
    if (!comment) throw new NotFound(`Comment with primary key ${ id } not found`);
    if(message !== undefined) comment.message = message;
    if(submitted !== undefined) comment.submitted = submitted;
    if(status !== undefined) comment.status = status;
    if (todo !== undefined) comment.todo = todo;
    await comment.save();
    return comment.reload();
  }



  static async destroy(id) {
    const comment = await Comment.findByPk(id);
    if (!comment) throw new NotFound(`Comment with primary key ${ id } not found`);
    await comment.destroy();
    return comment;
  }

}

export { CommentRepository };

