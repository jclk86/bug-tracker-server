import { Knex } from 'knex';

// admin access required
// what if update email and the owner changes?
export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('company', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('name', 64).notNullable().unique();
    table.timestamp('date_created').notNullable().defaultTo(knex.fn.now());
    table.string('email', 64).nullable().unique();
  });
}
// !should we reference the user table, if so, user needs to be created first
// !updates and deletes are main areas of concern - company and user primarily
export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('company');
}
