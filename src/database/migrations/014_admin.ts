import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('admin', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('first_name', 64).notNullable();
    table.string('last_name', 64).notNullable();
    table.string('email', 64).notNullable().unique();
    table.string('password', 64).notNullable();
    table
      .integer('permission_id')
      .notNullable()
      .references('id')
      .inTable('permission')
      .onDelete('set null');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('admin');
}
