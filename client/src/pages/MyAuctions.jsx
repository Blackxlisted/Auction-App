import React from 'react'
import { shortenString } from '../utils/utils'
import ReactTimeAgo from 'react-time-ago'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { loadImage } from '../utils/utils';
import { getAuctionsByUid } from '../api/api';
import { useParams, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function MyAuctions() {
    const [items, setItems] = useState([]);
    const [images, set_Images] = useState(null);
    const MAX_TITLE_LENGTH = 200;
    const { user, isLoading } = useAuth0();
    const sub = user.sub;

    useEffect(() => {
        if (!isLoading && user?.sub) {
            console.log(sub);
            async function fetchItems (sub) {
                try {
                    const item = await getAuctionsByUid(sub);
                    if (item.length === 0) {
                        return;
                    };
                    console.log(item);
                    setItems(item);
                    
                } catch (error) {
                    console.error(error);
                };
            };
            fetchItems(sub);
        }
    }, [isLoading, sub]);
    
    useEffect(() => {
            async function setImages() {
                const localImages = {}
                for (const auctionInfo of items) {
                    try {
                        const url = auctionInfo.image;
                        const id = auctionInfo.id;
                        const imageModule = await loadImage(url);
                        localImages[id] = imageModule;
                        
                    } catch (error) {
                        console.error(error);
                    }
                    
                };
                
                set_Images({...localImages});
            };
            setImages();
          
        
      }, [items])
    if (items.length !== 0) {
    return (
        <div className='grid grid-cols-4 mt-10'>
            {console.log(images)}
            {items.map((auctionInfo) => {

            return (
                <div key={auctionInfo.id} className='flex flex-col max-w-60 text-center'>
                    {/* image container */}
                    <div className='p-5'>
                    {auctionInfo.image_url ? (
                        <img src={auctionInfo.image_url} className='w-60 max-h-64'></img>
                    ) : (
                        <img src={images[auctionInfo.id]} className='w-60'></img>
                    )}
                        
                    </div>
                    {/* title */}
                    <div> {shortenString(auctionInfo.title, MAX_TITLE_LENGTH)} </div>
                    <div>
                        {/* shortened description: starting price, end date */}
                        <p> Starting at: £{(auctionInfo.price)} </p>
                        {auctionInfo.highest_bid !== 0 && auctionInfo.highest_bid ?
                        (<p> Current highest bid: £{auctionInfo.highest_bid}</p>) : auctionInfo.hasEnded ?
                        (<p>Auction ended</p>) :
                        (<p>No bids yet</p>)
                        }
                        <p>Min bid increment: £{auctionInfo.min_bid_increment}</p>
                        {
                        auctionInfo.end_time ? (
                            auctionInfo.hasEnded ? (<p>Ended: <ReactTimeAgo date={Date.parse(auctionInfo.end_time)} locale="en-GB"/> </p>)
                            : (<p> Ends <ReactTimeAgo date={Date.parse(auctionInfo.end_time)} locale="en-GB"/> </p>)
                        ) : (<></>)
                        }
                    </div>
                    <button className='btn'> <Link to={`/auctions/${auctionInfo.id}`} className='block w-[100%]'> View your auction </Link> </button>   
                </div>
            )
            })}
        </div>
    )} else {
        return(
            <div>
                You have no auctions...
                <Link to='/create-auction'>Create one now!</Link>
            </div>
        )
    }
    
}

export default MyAuctions