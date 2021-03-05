import Sequelize from 'sequelize';
import { config } from 'config';

import { commentModel } from './comment.model';
import { personModel } from './person.model';
import { todoModel } from './todo.model';

const env = process.env.NODE_ENV || 'development';

const { test, development } = config;

let database = {};

if (env === 'test') {
  database = test;
} else database = development;

const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  database.params
);

todoModel(sequelize);
commentModel(sequelize);
personModel(sequelize);

const { Todo,Comment,Person, } = sequelize.models;

Todo.associate(sequelize.models);
Comment.associate(sequelize.models);
Person.associate(sequelize.models);

sequelize.sync();

export { 
  sequelize,
  Todo,
  Comment,
  Person,
};
