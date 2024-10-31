/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("bids", (table) => {
        table.increments("id");
        table.string("uid", 100).notNullable();
        table.integer("item_id").notNullable();
        table.integer("amount_bid").notNullable();
        table.dateTime("time_bid").notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("bids");
};
