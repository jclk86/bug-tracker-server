import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('comment', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.timestamp('date_created').notNullable();
    table.uuid('ticket_id').notNullable().references('id').inTable('ticket');
    table.timestamp('last_edited').defaultTo(knex.fn.now());
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('user')
      .onUpdate('cascade')
      .onDelete('cascade');
    table.text('content').notNullable;
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('comment');
}
