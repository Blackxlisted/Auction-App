import express from 'express';
import AuctionsRouter from './routes/auctions.js';
import BidsRouter from './routes/bids.js';
import NotificationsRouter from './routes/notifications.js'
import cors from 'cors';

const app = express();

app.use(cors());

// middleware
app.use(express.json());

// routes
app.use('/api/auctions', AuctionsRouter);
app.use('/api/bids', BidsRouter);
app.use('/api/notifications', NotificationsRouter);

// middleware error handler
app.use((req, res) => {
    res.status(400).send('Bad request. Route not found. test')
})

const PORT = 5005;


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});