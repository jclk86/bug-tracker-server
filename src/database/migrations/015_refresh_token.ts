import { Knex } from 'knex';
// ! watch redis tutorial beforehand
// ! https://github.com/manosriram-youtube/jwt-redis/blob/master/index.js
export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('token', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('access_token', 64).notNullable();
    table.string('refresh_token', 64).notNullable();
    table.timestamp('last_updated_at').nullable();
    table
      .uuid('user_id')
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
