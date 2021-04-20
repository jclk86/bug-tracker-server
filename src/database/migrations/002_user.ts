import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().onDelete('cascade').onUpdate('cascade');
    table.string('name', 64).notNullable();
    table.string('email', 64).notNullable().unique();
    table.string('password', 64).notNullable();
    table.timestamp('date_created').notNullable().defaultTo(knex.fn.now());
    table.boolean('active').notNullable();
    table.timestamp('last_active').defaultTo(knex.fn.now());
    table.string('permission', 16).notNullable();
    table.uuid('company_id').notNullable().references('id').inTable('company');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user');
}
