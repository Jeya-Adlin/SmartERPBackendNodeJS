/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

    return knex.schema.createTable("inventory_transactions", (table) => {

        table.increments("id").primary();

        table.integer("company_id")
            .unsigned()
            .references("id")
            .inTable("companies");

        table.integer("item_id")
            .unsigned()
            .references("id")
            .inTable("stock_items");

        table.string("transaction_type");

        table.decimal("quantity", 18, 2);

        table.integer("reference_id");

        table.string("reference_type");

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("inventory_transactions");
};
