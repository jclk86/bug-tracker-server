import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('project', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('name', 64).notNullable().unique();
    table.timestamp('date_created').notNullable().defaultTo(knex.fn.now());
    table
      .uuid('team_leader_id')
      .notNullable()
      .references('id')
      .inTable('user')
      .onUpdate('cascade')
      .onDelete('cascade');
    table
      .uuid('company_id')
      .notNullable()
      .references('id')
      .inTable('company')
      .onUpdate('cascade')
      .onDelete('cascade');
    table.date('deadline');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('project');
}
