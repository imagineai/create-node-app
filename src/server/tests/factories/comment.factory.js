import { random, date } from 'faker';
import { buildTodo, createTodo } from './todo.factory';
import { Comment } from 'data/models';
import { commentStatusChoices } from 'server/utils/constants/fieldChoices';
import { getRandomValueFromArray } from 'server/utils/functions';

const buildComment = () => {
  const todoDict = buildTodo();

  return {
    comment: {
      id: random.number(),
      message: random.word(512),
      submitted: date.past(),
      status: getRandomValueFromArray(commentStatusChoices),
      todo: todoDict.todo.id,
    },
    todoDict,
  };
};

const createComment = async (fakeDict) => {
  const { comment, todoDict } = fakeDict;
  await createTodo(todoDict);

  await Comment.create(comment);
};

export { buildComment, createComment };
