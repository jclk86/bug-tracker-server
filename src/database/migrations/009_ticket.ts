import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('ticket', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('name', 64).notNullable().unique();
    table.timestamp('date_created').notNullable().defaultTo(knex.fn.now());
    table.date('deadline');
    table.uuid('phase_id').notNullable().references('id').inTable('phase');
    table.uuid('priority_level_id').notNullable().references('id').inTable('priority_level');
    table.uuid('category_id').notNullable().references('id').inTable('category');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('ticket');
}
