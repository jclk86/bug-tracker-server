import { Knex } from 'knex';

// admin access required
// add plans
// what if update email and the owner changes?
export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('account', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('company_name', 64).notNullable().unique();
    table.string('email', 64).notNullable().unique();
    table.string('plan', 64).nullable();
    table.timestamp('date_created');
    table.timestamp('last_edited');
  });
}
// !should we reference the user table, if so, user needs to be created first
// !updates and deletes are main areas of concern - account and user primarily
export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('Account');
}
