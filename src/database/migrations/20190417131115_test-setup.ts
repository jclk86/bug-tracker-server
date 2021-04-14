import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("test_setup", (table: Knex.TableBuilder) => {
    table.integer("foobar");
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("test_setup");
}
