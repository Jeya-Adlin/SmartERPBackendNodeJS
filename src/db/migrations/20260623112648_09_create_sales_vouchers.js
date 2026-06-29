/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("sales_vouchers", (table) => {

        table.increments("id").primary();

        table.integer("company_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("companies")
            .onDelete("CASCADE");

        table.integer("customer_ledger_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("ledgers");

        table.string("voucher_no")
            .notNullable()
            .unique();

        table.date("voucher_date")
            .notNullable();

        table.decimal("total_amount", 18, 2)
            .notNullable()
            .defaultTo(0);

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("sales_vouchers");
};