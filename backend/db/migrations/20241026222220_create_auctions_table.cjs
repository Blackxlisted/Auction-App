/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("auctions", (table) => {
    table.increments("id");
    table.string("uid", 100).notNullable().defaultTo("");
    table.string("title", 50).notNullable();
    table.text("description", 500).notNullable().defaultTo("No description provided.");
    table.integer("price").notNullable()
    table.text("image", 500).notNullable().defaultTo("No-Image-Available.jpg");
    table.dateTime("end_time").notNullable().defaultTo(
      knex.raw("NOW() + INTERVAL '1 day'")
    );
    table.boolean('hasEnded').notNullable().defaultTo(false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("auctions");
};
