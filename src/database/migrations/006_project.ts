import { Knex } from 'knex';

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable('project', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('name', 64).notNullable();
    table.string('description', 255);
    table.timestamp('date_created');
    table.date('start_date');
    table.timestamp('last_edited');
    table.date('due_date');
    table.date('completion_date');
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
    table
      .integer('project_priority_id')
      .references('id')
      .inTable('project_priority')
      .onDelete('set null');
    table
      .integer('project_status_id')
      .references('id')
      .inTable('project_status')
      .onDelete('set null');
  });
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTable('project');
}
