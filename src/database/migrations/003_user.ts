import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('user', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('name', 64).notNullable();
    table.string('email', 64).notNullable().unique();
    table.string('password', 64).notNullable();
    table.timestamp('date_created').notNullable();
    table.boolean('active').notNullable();
    table.timestamp('last_active').defaultTo(knex.fn.now());
    table
      .integer('permission_id')
      .notNullable()
      .references('id')
      .inTable('permission')
      .onDelete('set null');
    table
      .uuid('company_id')
      .notNullable()
      .references('id')
      .inTable('company')
      .onUpdate('cascade')
      .onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('user');
}
