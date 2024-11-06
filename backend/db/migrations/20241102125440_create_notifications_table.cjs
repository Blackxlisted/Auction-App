/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("notifications", (table) => {
        table.increments("id");
        table.string("uid", 100).notNullable();
        table.integer("item_id");
        table.decimal("outbid_price", 10, 2);
        table.dateTime("time_bid");
        table.string("title", 50);
        table.text("image", 500).notNullable().defaultTo("No-Image-Available.jpg");
        table.string("name", 50);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("notifications");
};
