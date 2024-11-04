/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("bids", (table) => {
        table.increments("id");
        table.string("uid", 100).notNullable();
        table.string("name").notNullable();
        table.integer("item_id").notNullable();
        table.integer("amount_bid").notNullable();
        table.dateTime("time_bid").notNullable().defaultTo(
            knex.raw("NOW()")
        );
        table.dateTime("item_end_time").notNullable();
        table.boolean('hasEnded').notNullable().defaultTo(false);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("bids");
};
