import { getAllBids, insertBid, getBidsByItemId } from "../models/bids.js";

const getBids = async (req, res) => {
    try {
        const bids = await getAllBids();
        return res.status(200).json(bids);
    } catch (error) {
        console.error(error); // debug
        return res.status(500).json(error);  // neat error handler
    }
}

const getBidsByItemIdController = async (req, res) => {
    try {
        const item_id = req.params.id;
        const bids = await getBidsByItemId(item_id);
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
        const { uid, name, item_id, amount_bid, time_bid, item_end_time } = body;
        await insertBid(uid, name, item_id, amount_bid, time_bid, item_end_time);
        return res.status(201).json({ message: 'Auction created successfully' });
    } catch (error) {
        console.error(error); // for debugging
        return res.status(500).json({ error: 'Error creating auction' }); // neat error handler     
    }
}

export { getBids, insertToBids, getBidsByItemIdController }