import { getAllAuctions, insertAuction, getAuctionById, updateAuctionHighestBid, updateAuctionMinBidIncrement } from '../models/auctions.js';


const getAuctions = async (req, res) => {
    try { 
        const results = await getAllAuctions();
        return res.status(200).json(results);
    } catch (error) {
        console.log(error); // debug
        return res.status(500).json(error);  // neat error handler
        
    }
} 

const getAuctionByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const auctionItem = await getAuctionById(id);
        return res.status(200).json(auctionItem);
    } catch (error) {
        console.error(error); // debug
        return res.status(500).json(error);  // neat error handler
    }
}

const updateAuctionMinBidIncrementController = async (req, res) => {
    try { 
        const { id, min_bid_increment } = req.body;      
        await updateAuctionMinBidIncrement(id, min_bid_increment);
        //return res.status(200).json({message: 'column bid_increment of auctions updated successfully'})
    }
    catch (error) {
        console.error(error)
        //return res.status(500).json(error);
    }
}

const updateAuctionHighestBidController = async (req, res) => { // no res.status to avoid headers_sent error
    try {
        const { item_id, amount_bid, sub } = req.body; // name = outbid_by
        const highest_bidder = sub;
        console.log('higherstbid controller body:', req.body);
        await updateAuctionHighestBid(item_id, amount_bid, sub);
        //return res.status(200).json({message: 'Auction highest_bid successfully updated'});
    }
    catch (error) {
        console.error(error) // debug
        //return res.status(500).json({ error: 'Error update auction highest_bid' }); // neat error handler
    };
}

const insertToAuctions = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const { title, uid, description, category, price, min_bid_increment, file, image_url, end_time } = body;
  
        await insertAuction(title, uid, description, category, price, min_bid_increment, file, image_url, end_time);
        return res.status(201).json({ message: 'Auction created successfully' });       
    }
    
    catch (error) {
        console.error(error) // debug
        return res.status(500).json({ error: 'Error creating auction' }); // neat error handler
    };
};


export { getAuctions, insertToAuctions, getAuctionByIdController, updateAuctionHighestBidController, updateAuctionMinBidIncrementController }