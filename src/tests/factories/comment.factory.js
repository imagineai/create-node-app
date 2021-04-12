import { random, datatype, date } from 'faker';
import { buildTodo, createTodo } from './todo.factory';
import { Comment } from 'data/models';
import { commentStatusChoices } from 'server/utils/constants/fieldChoices';
import { dateToUTC, getRandomValueFromArray } from 'server/utils/functions';

const buildComment = async (commentFks) => {
  let resComment = {};
  let todo = commentFks.todo;

  resComment.message = random.word().slice(0, 512);
  resComment.submitted = date.past().toJSON();
  resComment.status = getRandomValueFromArray(commentStatusChoices);

  if (commentFks.todo === null || typeof commentFks.todo === 'undefined') {
    const fakeTodo = await buildTodo({});
    const createdFakeTodo = await createTodo(fakeTodo);
    todo = createdFakeTodo.id;
  }

  resComment.todo = todo;

  return resComment;
};

const createComment = async (fakeComment) => {
  const comment = await Comment.create(fakeComment);
  return comment;
};

export { buildComment, createComment };
