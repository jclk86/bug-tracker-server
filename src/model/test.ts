import knex from './knex';

const db = knex();

const get = async () => {
  const data = await db.select('*').from('company');
  return data;
};

export default {
  get
};
