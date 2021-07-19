import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('project_users', (table: Knex.TableBuilder) => {
    table
      .uuid('project_id')
      .notNullable()
      .references('id')
      .inTable('project')
      .onUpdate('cascade')
      .onDelete('cascade');
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('user')
      .onUpdate('cascade')
      .onDelete('cascade');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('project_users');
}
