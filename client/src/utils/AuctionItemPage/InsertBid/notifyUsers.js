import axios from 'axios';
const ADD_NOTIS_URL = 'http://localhost:5005/api/notifications/add';

export const notifyUsers = (auctionItem, amount_bid, bids, uid, item_id, name) => {
    const time_bid = new Date();
    const { title, image } = auctionItem;
    const outbid_price = amount_bid;
    const usersToNotifySet = new Set();
    if (bids) {
        bids.forEach((bid => {
            console.log(bid.uid, uid);
            if (bid.uid !== uid) {
                usersToNotifySet.add(bid.uid);
            };
        }));
    };
    const usersToNotify = [...usersToNotifySet];
    if (usersToNotify) {
        usersToNotify.forEach(uid => {
            const notis_data = { uid, item_id, outbid_price, time_bid, title, image, name }
            axios
                .post(ADD_NOTIS_URL, notis_data)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };
}