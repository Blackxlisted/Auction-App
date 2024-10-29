import { getAllAuctions } from '../models/auctions.js';

async function getAuctions(req, res) {
    try { 
        const results = await getAllAuctions();
        return res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
} 

export { getAuctions }