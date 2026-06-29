/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("invoices", (table) => {
    table.increments("id").primary();

    table.integer("company_id").unsigned()
      .references("id").inTable("companies")
      .onDelete("CASCADE");

    table.string("voucher_type").notNullable();
    // SALES | PURCHASE

    table.string("voucher_no").notNullable();

    table.integer("ledger_id").unsigned()
      .references("id").inTable("ledgers");

    table.date("invoice_date").notNullable();

    table.decimal("total_amount", 18, 2);

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("invoices");
};
