import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('priority_level', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('name', 64).notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('priority_level');
}
