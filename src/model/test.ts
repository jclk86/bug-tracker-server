import testDB from '../service/test';

async function all(trx, limit) {
  return testDB.all(trx, limit);
}

export default {
  all
};
