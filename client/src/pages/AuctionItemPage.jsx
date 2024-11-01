import React, { useState, useEffect } from 'react'
import { getAuctionItem, getBids, getBidsByItemId, updateHasEnded } from '../api/api.js'
import { useParams } from 'react-router-dom';
import { loadImage } from '../utils/utils.js';
import { useAuth0 } from '@auth0/auth0-react';
import BidsCatalogue from '../components/BidsCatalogue.jsx';
import axios from 'axios';

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

  useEffect(() => {
   
    async function fetchItem () {
        try {
            const item = await getAuctionItem(id);
            setAuctionInfo(item);
            console.log(item);
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
                console.log(bidsObject)
                setBids(bidsObject);
                setCurrentPrice(bidsObject[0]?.amount_bid);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBids();
    }, [currentPrice]);

    // async function updateHasEndedOnClick () {
    //     try {
    //         await updateHasEnded()
    //     } catch (error) {
    //         console.error('Error on updating hasEnded before inserting bid', error)
    //     }
    // }

    async function insertBid (uid, item_id) {
        
        try {
            console.log('bids,', bids);
            // preset bid increment set here
            const amount_bid = (currentPrice !== null && !isNaN(currentPrice) && currentPrice !== undefined && currentPrice > 0)
            ? Math.ceil(currentPrice * 1.1) 
            : Math.ceil(auctionInfo.price * 1.1);
            setCurrentPrice(amount_bid);
            const item_end_time = auctionInfo.end_time; 
            const entries = {uid, item_id, amount_bid, item_end_time};
            console.log('entries', entries)
            axios
                .post(ADD_BID_URL, entries)
                .then((response) => {
                    console.log(response.data);
                    console.log(response);
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
        <div key={auctionInfo.id} className='flex flex-col max-w-60 text-center'>
            {/* image container */}
            <div className='p-5'>
                <img src={image} className='w-60'></img>
            </div>
            {/* title */}
            <div> {auctionInfo.title} </div>
            <div>
                {/* full description */}
                <p> Starting at: £{(auctionInfo.price)/100} </p>
                <p> Ends on: {auctionInfo.end_time} </p>
                <p> {auctionInfo.description} </p>
            </div>            
        </div>
        <div>
            {sub === auctionInfo.uid ? (
                    <h3>Current Bids</h3>
                ) :
                (   
                    
                    <button className='btn' onClick={() => {insertBid(sub, auctionInfo.id)}}>Place bid</button>
                )
            }
        </div>
        <section>
            <div>
                <BidsCatalogue bids={bids} itemInfo={auctionInfo} userID={sub} name={name} />
            </div>
        </section>
    </>
  )
}

export default AuctionItemPage