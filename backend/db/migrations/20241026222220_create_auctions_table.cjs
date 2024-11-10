/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("auctions", (table) => {
    table.increments("id");
    table.string("uid", 100).notNullable().defaultTo("");
    table.string("title").notNullable();
    table.text("description").notNullable().defaultTo("No description provided.");
    table.string("category");
    table.decimal("price", 10, 2).notNullable() // change to decimal 
    table.decimal("min_bid_increment", 10, 2).notNullable();
    table.string("image").notNullable().defaultTo("No-Image-Available.jpg");
    table.text("image_url");
    table.dateTime("end_time").notNullable().defaultTo(
      knex.raw("NOW() + INTERVAL '1 day'")
    );
    table.decimal("highest_bid", 10, 2);
    table.string("highest_bidder");
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
