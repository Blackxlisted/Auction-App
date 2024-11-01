import knex from 'knex';
import config from "../db/knexfile.js";

const db = knex(config['development']);

const getAllAuctions = async () => {
    const results = await db
        .select('*')
        .from('auctions')
        .orderBy([{column: 'end_time', order: 'desc'}]);
    console.log(results);
    return results;
}

const insertAuction = async (title, uid, description, price, file, end_time) => {
    await db('auctions')
        .insert({
            title: title,
            uid: uid,
            description: description,
            price: price,
            image: file,
            end_time: end_time
        })
}

const updateAuctionHasEnded = async () => {
    const currentTime = new Date().toISOString();
    await db('auctions')
      .where('end_time', '<', currentTime)
      .andWhere('hasEnded', false)
      .update({ hasEnded: true });
}

const getAuctionById = async (id) => {
    const results = await db
        .select('*')
        .from('auctions')
        .where('id', id)
    console.log(results)
    return results;
}

export { getAllAuctions, insertAuction, updateAuctionHasEnded, getAuctionById }