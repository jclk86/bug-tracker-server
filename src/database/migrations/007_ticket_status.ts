import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('ticket_status', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.integer('order_number');
    table.text('option');
    table.text('color');
    table.boolean('marks_empty').defaultTo(false);
    table.boolean('marks_completion').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('ticket_status');
}
