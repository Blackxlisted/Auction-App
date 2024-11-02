import { getAllAuctions, insertAuction, getAuctionById, updateAuctionHighestBid } from '../models/auctions.js';


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

const updateAuctionHighestBidController = async (req, res) => { // no res.status to avoid headers_sent error
    try {
        const { item_id, amount_bid } = req.body;
        await updateAuctionHighestBid(item_id, amount_bid);
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
        const { title, uid, description, price, file, end_time } = body;
  
        await insertAuction(title, uid, description, price, file, end_time);
        return res.status(201).json({ message: 'Auction created successfully' });       
    }
    
    catch (error) {
        console.error(error) // debug
        return res.status(500).json({ error: 'Error creating auction' }); // neat error handler
    };
};


export { getAuctions, insertToAuctions, getAuctionByIdController, updateAuctionHighestBidController }