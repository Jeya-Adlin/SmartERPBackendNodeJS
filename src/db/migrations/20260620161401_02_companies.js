/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("companies", (table) => {
    table.increments("id").primary();

    table.integer("user_id").unsigned()
      .references("id").inTable("users")
      .onDelete("CASCADE");

    table.string("company_name").notNullable();
    table.text("address");
    table.string("gst_number");
    table.string("financial_year");
    table.string("state");
    table.string("contact_no");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTableIfExists("companies");
};
