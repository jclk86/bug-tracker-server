import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('ticket', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('name', 64).notNullable().unique();
    table.string('description', 255);
    table.timestamp('date_created').notNullable();
    table
      .integer('ticket_status_id')
      .notNullable()
      .references('id')
      .inTable('ticket_status')
      .onDelete('set null');
    table
      .integer('ticket_priority_level_id')
      .notNullable()
      .references('id')
      .inTable('ticket_priority')
      .onDelete('set null');
    table.timestamp('last_edited').defaultTo(knex.fn.now());
    table.date('due_date');
    table.date('completion_date');
    table.uuid('project_id').notNullable().references('id').inTable('project').onDelete('set null');
  });
}
// ! change onDelete to cascade. If a project is deleted, tickets should not remain
//! remove deadline - rollback
export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('ticket');
}
