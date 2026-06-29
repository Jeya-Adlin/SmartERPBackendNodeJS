/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("units", (table) => {
    table.increments("id").primary();

    table.integer("company_id").unsigned()
      .references("id").inTable("companies")
      .onDelete("CASCADE");

    table.string("unit_name").notNullable();
    table.string("symbol").notNullable();

    table.timestamps(true, true);
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("units");
};
