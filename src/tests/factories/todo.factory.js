import { random, datatype, date } from 'faker';
import { buildPerson, createPerson } from './person.factory';
import { Todo } from 'data/models';
import { dateToUTC } from 'server/utils/functions';

const buildTodo = async (todoFks) => {
  let resTodo = {};
  let assignee = todoFks.assignee;

  resTodo.title = random.word().slice(0, 255);
  resTodo.description = random.word().slice(0, 1024);
  resTodo.dueDate = date.past().toJSON();
  resTodo.done = datatype.boolean();

  if (todoFks.assignee === null || typeof todoFks.assignee === 'undefined') {
    const fakeAssignee = await buildPerson({});
    const createdFakeAssignee = await createPerson(fakeAssignee);
    assignee = createdFakeAssignee.id;
  }

  resTodo.assignee = assignee;

  return resTodo;
};

const createTodo = async (fakeTodo) => {
  const todo = await Todo.create(fakeTodo);
  return todo;
};

export { buildTodo, createTodo };
