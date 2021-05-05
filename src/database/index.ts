import knex, { Knex } from 'knex';
import knexConfig from '../../knexfile';

const postgresConfig = knexConfig.development;

export default class PostgresDB {
  public static get Connection() {
    if (!this.connection) {
      this.connection = knex(postgresConfig);
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
  private static connection = knex(postgresConfig);
}
