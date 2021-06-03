import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('project_priority', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.integer('order_number');
    table.text('option');
    table.boolean('marks_empty').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('project_priority');
}
