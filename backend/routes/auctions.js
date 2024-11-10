import express from 'express';
import { getAuctions, insertToAuctions, getAuctionByIdController, updateAuctionMinBidIncrementController } from '../controllers/auctions.js';
import { updateAuctionHasEnded } from '../models/auctions.js';

const router = express.Router();

router.get('/', (req, res) => {
    updateAuctionHasEnded(req, res);
    getAuctions(req, res);
});

router.get('/:id', (req, res) => {
    updateAuctionHasEnded(req, res);
    getAuctionByIdController(req, res);
});

router.post('/update-min-bid-increment', (req, res) => {
    updateAuctionMinBidIncrementController(req, res);
});

// URL = http://localhost:5005/api/auctions/add
router.post('/add', (req, res) => {
    insertToAuctions(req, res);
});

export default router;