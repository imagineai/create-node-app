import { random, date } from 'faker';
import { buildPerson, createPerson } from './person.factory';
import { Todo } from 'data/models';

const buildTodo = () => {
  const assigneeDict = buildPerson();

  return {
    todo:
    {
      id: random.number(),
      title: random.word(255),
      description: random.word(1024),
      dueDate: date.past(),
      done: random.boolean(),
      assignee: assigneeDict.person.id,
    },
    assigneeDict,
  };
};

const createTodo = async (fakeDict) => {
  const { todo, assigneeDict, } = fakeDict;
  await createPerson(assigneeDict);
  
  await Todo.create(todo);
};

export { buildTodo, createTodo };

