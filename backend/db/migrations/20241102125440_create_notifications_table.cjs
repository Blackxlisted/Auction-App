/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("notifications", (table) => {
        table.increments("id");
        table.string("uid", 100).notNullable()
        table.integer("item_id")
        table.integer("outbid_price")
        table.dateTime("time_bid")
        table.string("title", 50);
        table.text("image", 500).notNullable().defaultTo("No-Image-Available.jpg");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("notifications");
};
