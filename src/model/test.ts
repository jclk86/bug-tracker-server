// import knex from '../config/index';
// const db = knex;

// const get = async () => {
//   const data = await db('company').select('*');
//   return data;
// };

// export default {
//   get
// };

import testDB from '../service/test';

async function all(trx, limit) {
  return testDB.all(trx, limit);
}

export default {
  all
};
