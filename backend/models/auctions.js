import knex from 'knex';
import config from "../db/knexfile.js";
import { insertUserToNotis } from './notifications.js';

const db = knex(config['development']);

const getAllAuctions = async () => {
    const results = await db
        .select('*')
        .from('auctions')
        .orderBy([{column: 'end_time', order: 'desc'}]);
    console.log(results);
    return results;
}

const insertAuction = async (title, uid, description, category, price, min_bid_increment, file, image_url, end_time) => {
    await db('auctions')
        .insert({
            title: title,
            uid: uid,
            description: description,
            category: category,
            price: price,
            min_bid_increment: min_bid_increment,
            image: file,
            image_url, image_url,
            end_time: end_time
        })
}

const updateAuctionHasEnded = async () => {
    const currentTime = new Date().toISOString();
    const result = await db('auctions')
      .where('end_time', '<', currentTime)
      .andWhere('hasEnded', false)
      .update({ hasEnded: true })
      .returning('*');
    for (const row of result) {
        const { id, uid, highest_bid, highest_bidder, end_time, title, image } = row
        const item_id = id;
        const outbid_price = highest_bid;
        const time_bid = end_time;
        const isBidder = true;
        const hasEnded = true;
        const name = 'auctionEnded';
        await insertUserToNotis(uid, item_id, outbid_price, time_bid, title, image, name, hasEnded, false);
        if (highest_bidder) { // checks if the auction had any bids before it ended, else dont send any other notis.
            await insertUserToNotis(highest_bidder, item_id, outbid_price, time_bid, title, image, name, hasEnded, isBidder);
        }
        
    }
}

const updateAuctionHighestBid = async (id, amount_bid, highest_bidder) => {
    console.log('body in models', amount_bid, highest_bidder)
    await db('auctions')
        .where('id', id)
        .update({ highest_bid: amount_bid, highest_bidder: highest_bidder })

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