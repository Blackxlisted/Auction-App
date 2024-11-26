import axios from 'axios';
const ADD_NOTIS_URL = 'http://localhost:5005/api/notifications/add';

export const notifyUsers = (auctionItem, amount_bid, bids, uid, item_id, name) => {
    const time_bid = new Date();
    const { title, image } = auctionItem;
    const outbid_price = amount_bid;
    const usersToNotifySet = new Set(); // unique Set for the case where a user has multiple bids on a auction item,
    // and a new user bids on the auction, Set prevents that user with multiple bids on a item recieiving multiple
    // notifications.
    if (bids) { // if bids on the auction item
        bids.forEach((bid => { // loop through all bids
            console.log(bid.uid, uid);
            if (bid.uid !== uid) { // if uid stored in bid item equals uid given to notifyUsers
                usersToNotifySet.add(bid.uid); // add that bid uid to userToNotify
            };
        }));
    };
    const usersToNotify = [...usersToNotifySet]; // reformat to list
    if (usersToNotify) { // if not empty
        usersToNotify.forEach(uid => { // loop through unique users to notify
            const notis_data = { uid, item_id, outbid_price, time_bid, title, image, name } // format the data
            axios // send data to notifications database, which will be retrieved in the home page to
            // notify the user who is logged in when they navigate to home page.
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