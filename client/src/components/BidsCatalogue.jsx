import React from 'react'
import BidItem from './BidItem';

function BidsCatalogue({ bids, itemInfo }) {
    const { id } = itemInfo;
    
    
    return (
        <>
        <div className='font-sans font-semibold border-1 rounded-md'>All Bids</div>
        {bids.find(bid => bid.item_id === id) ?
            (
                bids.map((bid => {
                    const { id, name, item_id, amount_bid, time_bid } = bid;
                    return (
                        <BidItem
                            key={id}
                            id={id} 
                            item_id={item_id} 
                            amount_bid={amount_bid} 
                            time_bid={time_bid}
                            name={name}
                        />
                    );
            })))
            : (
               <div className='font-sans font-semibold border-1 rounded-md'>No bids made...</div> 
            )}  
        </>
    )
}

export default BidsCatalogue