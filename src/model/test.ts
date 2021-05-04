import knex from './knex';
// should be a class
const db = knex;

const get = async () => {
  const data = await db('company').select('*');
  return data;
};

export default {
  get
};
