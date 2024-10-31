import express from 'express';
import { getAuctions, insertToAuctions } from '../controllers/auctions.js';


const router = express.Router();

router.get('/', (req, res) => {
    getAuctions(req, res);
});

// URL = http://localhost:5005/api/auctions/add
router.post('/add', (req, res) => {
    insertToAuctions(req, res);
})

export default router;