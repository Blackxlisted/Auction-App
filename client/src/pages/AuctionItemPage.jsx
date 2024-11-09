import React, { useState, useEffect } from 'react'
import { getAuctionItem, getBidsByItemId } from '../api/api.js'
import { useParams } from 'react-router-dom';
import { loadImage } from '../utils/utils.js';
import { useAuth0 } from '@auth0/auth0-react';
import BidsCatalogue from '../components/BidsCatalogue.jsx';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago'
// utils
import { fetchAuctionItem } from '../utils/AuctionItemPage/fetchAuctionItem.js';
import { fetchBids } from '../utils/AuctionItemPage/fetchBids.js';
import { setAmountBid } from '../utils/AuctionItemPage/InsertBid/setAmountBid.js';
import { notifyUsers } from '../utils/AuctionItemPage/InsertBid/notifyUsers.js';

function AuctionItemPage() {
    const { user } = useAuth0();
    const sub = user?.sub;
    const name = user?.name;
    const { id } = useParams();
    const [auctionInfo, setAuctionInfo] = useState({});
    const [image, setImage] = useState(null);
    const [bids, setBids] = useState([]);
    const ADD_BID_URL = 'http://localhost:5005/api/bids/add';
    const [currentPrice, setCurrentPrice] = useState(0);
    const [bidIncrement, setBidIncrement] = useState(0);
    const [hasInput, setHasInput] = useState(false);
    const [customIncrement, setCustomIncrement] = useState('');

    useEffect(() => {
        fetchAuctionItem(id, getAuctionItem, setBidIncrement, setAuctionInfo, loadImage, setImage);
    }, [id]);

    useEffect(() => {
        fetchBids(id, getBidsByItemId, setBids, setCurrentPrice);
    }, [currentPrice]);

    async function insertBid (uid, item_id, customIncrement) {
        
        try {
            const auctionItem = {...auctionInfo};
            const amount_bid = await setAmountBid(customIncrement, auctionItem, currentPrice, setCurrentPrice);
            
            const { end_time, hasEnded } = auctionItem;
            const item_end_time = end_time;
            const entries = { uid, name, item_id, amount_bid, item_end_time, hasEnded, sub }; // uid=owner of auction, name/sub = bidder (logged in user)
            console.log('auction item', auctionItem);
            console.log('entries to bid insert', entries);
            axios
                .post(ADD_BID_URL, entries)
                .then((response) => {
                    console.log(response.data);
                    notifyUsers(auctionItem, amount_bid, bids, uid, item_id, name);
                })
                .catch((error) => {
                    console.log(error);
                });
            
            
        } catch (error) {
            console.error('Error fetching bids insertBid()', error);
        }
        
    }

    

    return (
        <>
            {console.log(currentPrice)}
            <div key={auctionInfo.id} className='flex flex-col max-w-60 text-center'>
                {/* image container */}
                <div className='p-5'>
                    {auctionInfo.image_url ? 
                    (<img src={auctionInfo.image_url} className='w-60'></img>) 
                    : (<img src={image} className='w-60'></img>)}
                </div>
                {/* title */}
                <div> {auctionInfo.title} </div>
                <div>
                    {/* full description */}
                    <p> Starting at: £{(auctionInfo.price)} </p>
                    {auctionInfo.end_time ? 
                    (
                        auctionInfo.hasEnded ? (<p>Ended: <ReactTimeAgo date={Date.parse(auctionInfo.end_time)} locale="en-GB"/> </p>)
                        : (<p> Ends <ReactTimeAgo date={Date.parse(auctionInfo.end_time)} locale="en-GB"/> </p>)
                    )
                    : (<></>)}
                    <p> {auctionInfo.description} </p>
                </div>            
            </div>
            <div>
                {sub === auctionInfo.uid ? (
                        <h3>Current Bids</h3>
                    ) : auctionInfo.hasEnded == true ?
                    (                     
                        <h3>Auction expired</h3>
                    ) : bids[0]?.uid !== sub ? (
                        <div>
                            <label htmlFor='increment'></label>
                            <input type='number' name='increment' value={customIncrement} onChange={(e) => {setCustomIncrement(e.target.value); setHasInput(e.target.value)}} step='0.01' min={(!isNaN(currentPrice) && !isNaN(bidIncrement)) ? (currentPrice + bidIncrement) : auctionInfo.price + bidIncrement} placeholder='Set your own amount'/>
                            {hasInput ? 
                            (<button type='submit' className='btn' onClick={() => insertBid(sub, auctionInfo.id, customIncrement)}>Place custom bid</button>)
                            : (<button className='btn' onClick={() => {insertBid(sub, auctionInfo.id)}}>Place bid £{currentPrice ? (parseFloat(currentPrice+bidIncrement)) : (parseFloat(auctionInfo.price+bidIncrement))}</button>)}
                            
                        </div>
                    ) : (<p>You hold highest bid</p>)
                }
            </div>
            <section>
                <div>
                    <BidsCatalogue bids={bids} itemInfo={auctionInfo} />
                </div>
            </section>
        </>
    )
}

export default AuctionItemPage