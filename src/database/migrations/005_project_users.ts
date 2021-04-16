import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('project_users', (table: Knex.TableBuilder) => {
    table
      .uuid('project_id')
      .notNullable()
      .references('id')
      .inTable('project')
      .onUpdate('cascade')
      .onDelete('cascade');
    table
      .uuid('team_leader_id')
      .notNullable()
      .references('id')
      .inTable('user')
      .onUpdate('cascade')
      .onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('company');
}
