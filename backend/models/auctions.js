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

const insertAuction = async (title, uid, description, price, bid_increment, file, end_time) => {
    await db('auctions')
        .insert({
            title: title,
            uid: uid,
            description: description,
            price: price,
            bid_increment: bid_increment,
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

const updateAuctionHighestBid = async (id, highest_bid) => {
    await db('auctions')
        .where('id', id)
        .update({ highest_bid: highest_bid })
}

const getAuctionById = async (id) => {
    const results = await db
        .select('*')
        .from('auctions')
        .where('id', id)
    console.log(results)
    return results;
}

const updateAuctionMinBidIncrement = async (id, min_bid_increment) => {
     await db('auctions')
        .where('id', id)
        .update({ min_bid_increment: min_bid_increment})
 
}

export { getAllAuctions, insertAuction, updateAuctionHasEnded, getAuctionById, updateAuctionHighestBid, updateAuctionMinBidIncrement }