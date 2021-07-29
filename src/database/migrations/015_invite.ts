import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('invite', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('email', 64).notNullable();
    table
      .uuid('account_id')
      .notNullable()
      .references('id')
      .inTable('account')
      .onUpdate('cascade')
      .onDelete('cascade');
    table.timestamp('date_sent');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('invite');
}
