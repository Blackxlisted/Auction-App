import { insertUserToNotis, getNotisByUid, getNotis } from "../models/notifications.js";

const insertUserToNotisController = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const { uid, item_id, outbid_price, time_bid, title, image, name } = body;
        await insertUserToNotis(uid, item_id, outbid_price, time_bid, title, image, name);
        return res.status(201).json({ message: 'Insertion of data to notifications success' });
    } catch (error) {
        if (error === '23505') {
            return;
        }
        console.error(error); // for debugging
        return res.status(500).json({ error: 'Error inserting uid to notifications' }); // neat error handler     
    }
}

const getNotisByUidController = async (req, res) => {
    try {
        const uid = req.headers['uid'];
        console.log('uid in controller', uid);
        const notis = await getNotisByUid(uid);
        console.log(notis);
        return res.status(200).json(notis);
    } catch (error) {
        console.error(error); // debug
        return res.status(500).json(error);  // neat error handler
    }
}

const getNotisController = async (req, res) => {
    try {
        const notis = await getNotis();
        return res.status(200).json(notis);
    } catch (error) {
        console.error(error); // debug
        return res.status(500).json(error);  // neat error handler
    }
}

export { insertUserToNotisController, getNotisByUidController, getNotisController }