import axios from 'axios';
const AUCTIONS_ENDPOINT = 'http://localhost:5005/api/auctions';

export const getAuctions = async () => {
    try {
        const response = await axios.get(AUCTIONS_ENDPOINT);
        return response.data;
    } catch (error) {
        console.error('Error fetching auctions from backend server', error);
    }
};
