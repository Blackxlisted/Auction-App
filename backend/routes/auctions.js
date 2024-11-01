import express from 'express';
import { getAuctions, insertToAuctions, getAuctionByIdController } from '../controllers/auctions.js';
import { updateAuctionHasEnded } from '../models/auctions.js';

const router = express.Router();

router.get('/', (req, res) => {
    getAuctions(req, res);
});

router.get('/:id', (req, res) => {
    updateAuctionHasEnded(req, res);
    getAuctionByIdController(req, res);
});

// URL = http://localhost:5005/api/auctions/add
router.post('/add', (req, res) => {
    insertToAuctions(req, res);
});

export default router;