import axios from 'axios';
import { store } from '../store.js';


const AUCTIONS_ENDPOINT = 'http://localhost:5005/api/auctions';
const BIDS_ENDPOINT = 'http://localhost:5005/api/bids';
const UPDATE_HASENDED_ENDPOINT = 'http://localhost:5005/api/bids/updateHasEnded';
const NOTIS_ENDPOINT = 'http://localhost:5005/api/notifications/get-by-uid';
const DEL_NOTIFICATION_URL = 'http://localhost:5005/api/notifications/delete'

// trigger functions 
// (will trigger the controller functions that are mounted on the relevant url endpoints)

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
        console.error('Error fetching auction item from backend server', error);
    }
};

export const getBids = async () => {
    try {
        const response = await axios.get(BIDS_ENDPOINT);
        return response.data;
    } catch (error) {
        console.error('Error retrieving bids', error);
    }
}

export const getBidsByItemId = async (item_id) => {
    try {
        const response = await axios.get(`${BIDS_ENDPOINT}/${item_id}`);
        return response.data;
    } catch (error) {
        console.error('Error retrieving bids by dynamic id', error);
    }
}

export const updateHasEnded = async () => {
    try {
        const response = await axios.get(UPDATE_HASENDED_ENDPOINT);
        return response.data;
    } catch (error) {
        console.error('Error on updating columns hasEnded of bids table', error);
    }
}

// export const deleteNotification = async (uid, item_id) => {
//     axios.get(DEL_NOTIFICATION_URL, {
//         headers: {
//             'uid': uid,
//             'item_id': item_id
//         }
//     })
//     .then((response) => {
//         console.log(response.data);
//     })
//     .catch((error) => {
//         console.log('Error on deleting notifications row in api.js', error);
//     });
    
// }

// export const getNotisByUidController = async (uid) => {
//     try {
//         const response = await axios.get(NOTIS_ENDPOINT, {
//             headers: {
//                 'uid': uid
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error on getting notifications endpoint', error);
//     }
// }

