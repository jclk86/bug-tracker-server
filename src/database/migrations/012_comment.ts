import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('comment', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.timestamp('date_created').notNullable().defaultTo(knex.fn.now());
    table.uuid('ticket_id').notNullable().references('id').inTable('ticket');
    table.uuid('user_id').notNullable().references('id').inTable('user');
    table.text('content').notNullable;
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('comment');
}
