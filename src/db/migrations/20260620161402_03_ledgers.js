/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("ledgers", (table) => {
    table.increments("id").primary();

    table.integer("company_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("companies")
      .onDelete("CASCADE");

    table.string("ledger_name", 255)
      .notNullable();

    table.enu("ledger_type", [
      "CUSTOMER",
      "SUPPLIER",
      "CASH",
      "BANK",
      "EXPENSE",
      "INCOME"
    ]).notNullable();

    table.string("phone", 20);
    table.string("email", 255);

    table.text("address");

    table.decimal("opening_balance", 18, 2)
      .defaultTo(0);

    table.boolean("is_active")
      .defaultTo(true);

    table.timestamps(true, true);

    table.unique(["company_id", "ledger_name"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("ledgers");
};
