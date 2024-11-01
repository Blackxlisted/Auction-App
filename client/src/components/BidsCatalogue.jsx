import React from 'react'
import BidItem from './BidItem';

function BidsCatalogue({ bids, itemInfo, userID }) {
    const { id } = itemInfo;
    
    
    return (
        <>
        <div>BidsCatalogue</div>
        {bids.find(bid => bid.item_id === id) ?
            (
                bids.map((bid => {
                    const { id, uid, item_id, amount_bid, time_bid } = bid;
                    return (
                        <BidItem
                            key={id}
                            id={id} 
                            uid={userID} 
                            item_id={item_id} 
                            amount_bid={amount_bid} 
                            time_bid={time_bid} 
                        />
                    );
            })))
            : (
               <div>No bids made...</div> 
            )}  
        </>
    )
}

export default BidsCatalogue