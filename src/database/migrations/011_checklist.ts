import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('checklist', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('name', 64).notNullable();
    table.string('description', 64);
    table.boolean('completed').defaultTo(false);
    table
      .uuid('ticket_id')
      .notNullable()
      .references('id')
      .inTable('ticket')
      .onUpdate('cascade')
      .onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('checklist');
}
