import express from 'express';
import { getBids, insertToBids } from '../controllers/bids.js';


const router = express.Router();

router.get('/', (req, res) => {
    getBids(req, res);
});

// URL = http://localhost:5005/api/bids/add
router.post('/add', (req, res) => {
    insertToBids(req, res);
})

export default router;
