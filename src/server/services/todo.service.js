import { TodoRepository } from 'data/repositories';

class TodoService {
  static create(id, title, description, dueDate, done, assignee) {
    return TodoRepository.create(id, title, description, dueDate, done, assignee );
  }
  
  static get(id) {
    return TodoRepository.get(id);
  }
  
  static getAll() {
    return TodoRepository.getAll();
  }
  
  static update(id, title, description, dueDate, done, assignee) {
    return TodoRepository.update(id, title, description, dueDate, done, assignee );
  }

  static partialUpdate(id, title, description, dueDate, done, assignee) {
    return TodoRepository.partialUpdate({ id, title, description, dueDate, done, assignee });
  }
  
  static destroy(id) {
    return TodoRepository.destroy(id);
  }
}

export { TodoService };

