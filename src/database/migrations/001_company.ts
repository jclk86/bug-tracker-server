import { Knex } from 'knex';

// admin access required
export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('company', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('name', 64).notNullable().unique();
    table.timestamp('date_created').notNullable().defaultTo(knex.fn.now());
    table.uuid('account_owner_id');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('company');
}
