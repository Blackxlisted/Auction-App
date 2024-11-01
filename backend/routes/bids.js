import express from 'express';
import { getBids, insertToBids, getBidsByItemIdController } from '../controllers/bids.js';
import { updateHasEnded } from '../models/bids.js';

const router = express.Router();

router.get('/', (req, res) => {
    getBids(req, res);
});

router.get('/:id', (req, res) => {
    getBidsByItemIdController(req, res);
    updateHasEnded(req, res);
});

router.get('/updateHasEnded', (req, res) => {
    updateHasEnded(req, res);
});

// URL = http://localhost:5005/api/bids/add
router.post('/add', (req, res) => {
    insertToBids(req, res);
});

export default router;
