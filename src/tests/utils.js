import request from 'supertest';
import { sequelize } from 'data/models';

const startDatabase = async () => {
  await sequelize.sync({ force: true });
};

const deleteDatabase = (db) => db.drop();

export { request, startDatabase, deleteDatabase };
