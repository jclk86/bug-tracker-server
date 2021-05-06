import { Knex } from 'knex';
import db from './config';
export default class PostgresDB {
  public static get Connection(): Knex {
    if (!this.connection) {
      this.connection = db;
    }
    return this.connection;
  }

  public static startTransaction(): Promise<Knex.Transaction> {
    return new Promise((resolve, reject) => {
      return PostgresDB.Connection.transaction((trx) => {
        return resolve(trx);
      }).catch(reject);
    }) as Promise<Knex.Transaction>;
  }
  private static connection: Knex;
}
