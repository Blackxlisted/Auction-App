import React, { useState, useEffect } from 'react'
import { getAuctionItem, getBids } from '../api/api.js'
import { useParams } from 'react-router-dom';
import { loadImage } from '../utils/utils.js';
import { useAuth0 } from '@auth0/auth0-react';
import BidsCatalogue from '../components/BidsCatalogue.jsx';

function AuctionItemPage() {
  const { user } = useAuth0();
  const sub = user?.sub;
  const { id } = useParams();
  const [auctionInfo, setAuctionInfo] = useState({});
  const [image, setImage] = useState(null);
  const [bids, setBids] = useState([]);

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
            const bidsObject = await getBids();
            console.log(bidsObject)
            setBids(bidsObject);
        } catch (error) {
            console.error(error);
        }
    };
    fetchBids();
  }, []);



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
            {sub === auctionInfo.uid ? (<h3>Current Bids</h3>): (<button className='btn'>Place bid</button>)}
        </div>
        <section>
            <div>
                <BidsCatalogue bids={bids} itemInfo={auctionInfo}/>
            </div>
        </section>
    </>
  )
}

export default AuctionItemPage