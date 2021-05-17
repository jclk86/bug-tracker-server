// model interfaces with database. Handles all data logic and data manipulation
import { Knex } from 'knex';
interface Company {
  id: string;
  name: string;
  date_created: Date;
}

function all(trx: Knex.Transaction): Knex.QueryBuilder {
  return trx.table<Company>('company').returning('*');
}

export default {
  all
};
