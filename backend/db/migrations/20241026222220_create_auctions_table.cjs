/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("auctions", (table) => {
    table.increments("id");
    table.string("title", 50).notNullable().defaultTo("");
    table.string("description", 500).notNullable().defaultTo("");
    table.integer("price").notNullable().defaultTo(0);
    table.string("image", 500).notNullable().defaultTo("No-Image-Available.jpg");
    // holds path to image uploaded by user - not actual image
    // default should be path for stock image?
    table.dateTime("end_time").notNullable().defaultTo(
      knex.raw("NOW() + INTERVAL '1 day'")
    );

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("auctions");
};
