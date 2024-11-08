import React, { useState, useEffect } from 'react'
import { getAuctionItem, getBids, getBidsByItemId, updateHasEnded } from '../api/api.js'
import { useParams } from 'react-router-dom';
import { loadImage } from '../utils/utils.js';
import { useAuth0 } from '@auth0/auth0-react';
import BidsCatalogue from '../components/BidsCatalogue.jsx';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago'
import toast, { Toaster } from 'react-hot-toast';

function AuctionItemPage() {
  const { user } = useAuth0();
  const sub = user?.sub;
  const name = user?.name;
  const { id } = useParams();
  const [auctionInfo, setAuctionInfo] = useState({});
  const [image, setImage] = useState(null);
  const [bids, setBids] = useState([]);
  const ADD_BID_URL = 'http://localhost:5005/api/bids/add';
  const ADD_NOTIS_URL = 'http://localhost:5005/api/notifications/add';
  const UPDATE_INCREMENT_URL = 'http://localhost:5005/api/auctions/update-bid-increment';
  const [currentPrice, setCurrentPrice] = useState(0);
  const [bidIncrement, setBidIncrement] = useState(0);
  const [hasInput, setHasInput] = useState(false);
  const [customIncrement, setCustomIncrement] = useState('');

  useEffect(() => {
   
    async function fetchItem (id) {
        try {
            const item = await getAuctionItem(id);
            item.price = parseFloat(item.price);
            item.highest_bid = parseFloat(item.highest_bid);
            item.min_bid_increment = parseFloat(item.min_bid_increment);
            setBidIncrement(item.min_bid_increment);
            console.log(item);
            setAuctionInfo(item);
            console.log(item.image);
            const importedImage = await loadImage(item.image);
            console.log(importedImage);
            setImage(importedImage);
        } catch (error) {
            console.error(error);
        }
    } 

    fetchItem(id);
    
  }, [id]);

    useEffect(() => {
        async function fetchBids() {
            try {
                const bidsObject = await getBidsByItemId(id);
                setBids(bidsObject);
                setCurrentPrice(parseFloat(bidsObject[0]?.amount_bid));
                console.log(bidsObject)
                console.log('bids in fetch', bids);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBids();
    }, [currentPrice]);

    async function insertBid (uid, item_id, customIncrement) {
        
        try {
            console.log('bids,', bids);
            let amount_bid;
            const auctionItem = {...auctionInfo};
            console.log(customIncrement);
            console.log(currentPrice);
            console.log(auctionItem.min_bid_increment);
            if (customIncrement) {
                const itemPrice = currentPrice ? currentPrice : auctionInfo.price;
                if (customIncrement < itemPrice + auctionItem.min_bid_increment) {
                    toast.error(`Bid must be at least £${itemPrice + auctionItem.min_bid_increment}`);
                    return;
                }
                amount_bid = customIncrement;
                setCurrentPrice(amount_bid);
            } else {
                amount_bid = (currentPrice !== null && !isNaN(currentPrice) && currentPrice !== undefined && currentPrice > 0)
                ? Math.ceil(currentPrice + auctionItem.min_bid_increment) 
                : Math.ceil(auctionItem.price +  auctionItem.min_bid_increment);
                setCurrentPrice(amount_bid);
            }
            
            const item_end_time = auctionItem.end_time;
            const hasEnded = auctionItem.hasEnded
            console.log('amount bid before bid insert:', amount_bid);
            const entries = { uid, name, item_id, amount_bid, item_end_time, hasEnded, sub }; // uid=owner of auction, name/sub = bidder (logged in user)
            console.log('entries', entries)
            axios
                .post(ADD_BID_URL, entries)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            
            const time_bid = new Date();
            const { title, image } = auctionItem;
            const outbid_price = amount_bid;
            const usersToNotifySet = new Set();
            if (bids) {
                bids.map((bid => {
                    console.log(bid.uid, uid);
                    if (bid.uid !== uid) {
                        usersToNotifySet.add(bid.uid);
                    };
                }));
            };
            const usersToNotify = [...usersToNotifySet];
            if (usersToNotify) {
                usersToNotify.map(uid => {
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