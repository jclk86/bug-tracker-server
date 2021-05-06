import testDB from '../service/test';

// model interfaces with database. Handles all data logic and data manipulation

async function all(trx, limit) {
  return testDB.all(trx, limit);
}

export default {
  all
};
