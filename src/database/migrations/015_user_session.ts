import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('user_sessions', (table: Knex.TableBuilder) => {
    table.string('sid').notNullable();
    table.json('sess').notNullable();
    table.timestamp('expire').notNullable();
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('user_sessions');
}
