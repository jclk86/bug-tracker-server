import knex from 'knex';
import KnexFile from '../../knexfile';

const knexConfig = KnexFile[process.env.NODE_ENV || 'development'];

const db = knex(knexConfig);

export default db;
