import { Knex } from 'knex';
import db from './config';

export default function startTransaction(): Promise<Knex.Transaction> {
  return new Promise((resolve, reject) => {
    return db
      .transaction((trx) => {
        return resolve(trx);
      })
      .catch(() => {
        reject('unable to complete transaction');
      });
  }) as Promise<Knex.Transaction>;
}

// export default class PostgresDB {
//   public static get Connection(): Knex {
//     if (!this.connection) {
//       this.connection = db;
//     }
//     return this.connection;
//   }
//   // establishes or nothing transaction.
//   public static startTransaction(): Promise<Knex.Transaction> {
//     return new Promise((resolve, reject) => {
//       return PostgresDB.Connection.transaction((trx) => {
//         return resolve(trx);
//       }).catch(reject);
//     }) as Promise<Knex.Transaction>;
//   }
//   private static connection: Knex;
// }
