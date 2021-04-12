import { CommentRepository } from 'data/repositories';

class CommentService {
  static create(message, submitted, status, todo) {
    return CommentRepository.create(message, submitted, status, todo);
  }

  static get(id) {
    return CommentRepository.get(id);
  }

  static getAll(args) {
    return CommentRepository.getAll(args);
  }

  static update(id, message, submitted, status, todo) {
    return CommentRepository.update(id, message, submitted, status, todo);
  }

  static partialUpdate(id, message, submitted, status, todo) {
    return CommentRepository.partialUpdate({ id, message, submitted, status, todo });
  }

  static destroy(id) {
    return CommentRepository.destroy(id);
  }
}

export { CommentService };
