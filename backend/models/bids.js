import knex from 'knex';
import config from "../db/knexfile.js";

const db = knex(config['development'])

const getAllBids = async () => {
    const results = await db
        .select('*')
        .from('bids')
        .orderBy([{column: 'time_bid', order: 'desc'}])
    console.log(results);
    return results;
}

const insertBid = async (uid, item_id, amount_bid, time_bid) => {
    await db('auctions')
        .insert({
            uid: uid,
            item_id: item_id,
            amount_bid: amount_bid,
            time_bid: time_bid
        })
}
export { getAllBids, insertBid }