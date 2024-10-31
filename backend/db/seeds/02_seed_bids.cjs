/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bids').del()
  await knex('bids').insert([
    {
      uid: 1,
      item_id: 1,
      amount_bid: 100,
      time_bid: '2024-12-01 18:30:00'
    },
  ]);
};
