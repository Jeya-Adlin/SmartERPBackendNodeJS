/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("stock_items", (table) => {
    table.increments("id").primary();

    table.integer("company_id").unsigned()
      .references("id").inTable("companies")
      .onDelete("CASCADE");

    table.string("item_name").notNullable();
    table.string("sku").unique();

    table.integer("unit_id").unsigned()
      .references("id").inTable("units");

    table.decimal("purchase_price", 18, 2);
    table.decimal("selling_price", 18, 2);

    table.decimal("quantity", 18, 2).defaultTo(0);

    table.timestamps(true, true);
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("stock_items");
};
