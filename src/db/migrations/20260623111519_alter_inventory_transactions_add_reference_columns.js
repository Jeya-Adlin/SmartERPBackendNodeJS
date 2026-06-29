/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable("inventory_transactions", (table) => {
        table.integer("reference_id");
        table.string("reference_type");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable("inventory_transactions", (table) => {
        table.dropColumn("reference_id");
        table.dropColumn("reference_type");
    });
};
