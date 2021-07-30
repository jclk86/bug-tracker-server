import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('project_priority', (table: Knex.TableBuilder) => {
    table.integer('id').primary();
    table.text('option');
    table.boolean('marks_empty').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('project_priority');
}
