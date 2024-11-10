import knex from 'knex';
import config from "../db/knexfile.js";

const db = knex(config['development'])

const insertUserToNotis = async (uid, item_id, outbid_price, time_bid, title, image, name, hasEnded, isBidder) => {
    console.log(outbid_price)
    await db('notifications')
        .insert({
            uid: uid,
            item_id: item_id,
            outbid_price: outbid_price,
            time_bid: time_bid,
            title: title,
            image: image,
            name: name,
            hasEnded: hasEnded,
            isBidder: isBidder
        })
}

const getNotisByUid = async (uid) => {
    const results = await db
        .select('*')
        .from('notifications')
        .where('uid', uid)
    console.log(results)
    return results;
}

const getNotis = async () => {
    const results = await db
        .select('*')
        .from('notifications')
    console.log(results)
    return results;
}

const deleteNotisByUidItemId = async (uid, item_id) => {
    await db('notifications')
        .where({'uid': uid, 'item_id': item_id})
        .delete()
}

export { insertUserToNotis, getNotisByUid, getNotis, deleteNotisByUidItemId }