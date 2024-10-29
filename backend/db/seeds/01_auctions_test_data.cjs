/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('auctions').del()
  await knex('auctions').insert([
    {
      title: 'Headphones', description: 'Barely used modern headphones for cheap!', price: 10000, 
      image: "../src/assets/adv-web-headphones.jpg", end_time: '2024-10-30 15:00:00+02'
    },
  ]);
};
