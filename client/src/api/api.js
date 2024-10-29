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

// export const getImages = async () => {
//     try {
//         const auctionItems = await getAuctions();
//         auctionItems.map(auctionItem => {
//             const { image } = auctionItem;
//             console.log(image);
//             return (
//                 import(image)
//             )
//         })

//     } catch (error) {
//         console.error(error);
//     }
// }