import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('comment', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.timestamp('date_created');
    table
      .uuid('ticket_id')
      .notNullable()
      .references('id')
      .inTable('ticket')
      .onUpdate('cascade')
      .onDelete('cascade');
    table.timestamp('last_edited');
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
