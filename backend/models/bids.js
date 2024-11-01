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

const getBidsByItemId = async (item_id) => {
    const results = await db
        .select('*')
        .from('bids')
        .where('item_id', item_id)
        .orderBy([{column: 'time_bid', order: 'desc'}])
    console.log(results)
    return results;
}

const insertBid = async (uid, item_id, amount_bid, time_bid, item_end_time) => {
    await db('bids')
        .insert({
            uid: uid,
            item_id: item_id,
            amount_bid: amount_bid,
            time_bid: time_bid,
            item_end_time: item_end_time
        })
}

const updateHasEnded = async () => {
    const currentTime = new Date().toISOString();
    console.log(currentTime);
    await db('bids')
      .where('item_end_time', '<', currentTime)
      .andWhere('hasEnded', false)
      .update({ hasEnded: true });
}

export { getAllBids, insertBid, getBidsByItemId, updateHasEnded }