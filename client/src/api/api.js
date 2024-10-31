import axios from 'axios';
const AUCTIONS_ENDPOINT = 'http://localhost:5005/api/auctions';

export const getAuctions = async () => {
    try {
        const response = await axios.get(AUCTIONS_ENDPOINT);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching auctions from backend server', error);
    }
};

export const getAuctionItem = async (id) => {
    try {
        const response = await axios.get(AUCTIONS_ENDPOINT);
        const id_format = Number(id);
        const item = response.data.find(item => item.id === id_format);
        console.log(item);      
        return item;
    } catch (error) {
        console.error('Error fetching auctions from backend server', error);
    }
};