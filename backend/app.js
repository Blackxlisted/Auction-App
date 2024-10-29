import express from 'express';
import AuctionsRouter from './routes/auctions.js';
import cors from 'cors';

const app = express();

app.use(cors());

// middleware
app.use(express.json());

// routes
app.use('/api/auctions', AuctionsRouter);

app.use((req, res) => {
    res.status(400).send('Bad request. Route not found. test')
})

const PORT = 5005; // Set the desired port

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});