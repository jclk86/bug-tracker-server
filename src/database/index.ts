import { Knex } from 'knex';
// database config
import db from './config';
export default class PostgresDB {
  public static get Connection(): Knex {
    if (!this.connection) {
      this.connection = db;
    }
    return this.connection;
  }
  // establishes or nothing transaction.
  public static startTransaction(): Promise<Knex.Transaction> {
    return new Promise((resolve, reject) => {
      return PostgresDB.Connection.transaction((trx) => {
        return resolve(trx);
      }).catch(reject);
    }) as Promise<Knex.Transaction>;
  }
  private static connection: Knex;
}
