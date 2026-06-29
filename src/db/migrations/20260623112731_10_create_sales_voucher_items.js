/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

    return knex.schema.createTable("sales_voucher_items", (table) => {

        table.increments("id").primary();

        table.integer("sales_voucher_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("sales_vouchers")
            .onDelete("CASCADE");

        table.integer("item_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("stock_items");

        table.decimal("quantity", 18, 2)
            .notNullable();

        table.decimal("rate", 18, 2)
            .notNullable();

        table.decimal("amount", 18, 2)
            .notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sales_voucher_items");
};
