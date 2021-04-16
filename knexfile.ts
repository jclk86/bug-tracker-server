export default {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations'
  },
  seeds: {
    directory: './src/database/seeds'
  },
  timezone: 'UTC'
};
