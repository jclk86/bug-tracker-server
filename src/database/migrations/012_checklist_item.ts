import { Knex } from 'knex';
// ! reference checklist id
export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('checklist_item', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('description', 64).notNullable();
    table.boolean('checked').defaultTo(false);
    table
      .uuid('checklist_id')
      .notNullable()
      .references('id')
      .inTable('checklist')
      .onUpdate('cascade')
      .onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('checklist_item');
}
