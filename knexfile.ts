export default {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT || '5432',
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATEBASE_NAME || 'bug_tracker',
      user: process.env.DATEBASE_USER || 'postgres',
      ssl: false
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  },
  pool: {
    min: 2,
    max: 10
  },
  timezone: 'UTC'
};
