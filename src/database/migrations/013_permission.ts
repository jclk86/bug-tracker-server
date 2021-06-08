import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('permission', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.integer('order_number');
    table.text('level');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('permission');
}
