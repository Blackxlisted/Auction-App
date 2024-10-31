import { getAllBids, insertBid } from "../models/bids.js";

const getBids = async (req, res) => {
    try {
        const bids = await getAllBids();
        return res.status(200).json(bids);
    } catch (error) {
        console.error(error); // debug
        return res.status(500).json(error);  // neat error handler
    }
}

const insertToBids = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const { uid, item_id, amount_bid, time_bid } = body;
        await insertBid(uid, item_id, amount_bid, time_bid);
        return res.status(201).json({ message: 'Auction created successfully' });
    } catch (error) {
        console.error(error); // for debugging
        return res.status(500).json({ error: 'Error creating auction' }); // neat error handler     
    }
}

export { getBids, insertToBids }