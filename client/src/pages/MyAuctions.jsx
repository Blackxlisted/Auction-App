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

  
        <div className='flex flex-col gap-8 p-6'>
            {console.log(images)}
            {items.map((auctionInfo) => {

            return (
                <div key={auctionInfo.id} className='rounded-lg flex flex-wrap justify-between items-center gap-8 text-center mt-5 mr-0 overflow-x-auto bg-gradient-to-b from-gray-100 via-gray-50 to-blue-50 shadow-lg hover:shadow-2xl transition-shadow duration-200'>
                    {/* image container */}
                    <div className='h-52 w-52 font-light cursor-pointer relative m-4 bg-white shadow-md hover:shadow-xl rounded-lg flex flex-col justify-between p-4 transition-shadow duration-200'>
                    {auctionInfo.image_url ? (
                        <img src={auctionInfo.image_url} className='flex justify-center items-center h-32 overflow-hidden bg-gray-100 rounded-t-md'></img>
                    ) : (
                        <img src={images[auctionInfo.id]} className='object-contain w-full h-full'></img>
                    )}
                        
                    </div>
                    {/* title */}
                    <div className='font-semibold bg-white bg-opacity-80 border border-blue-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'> {shortenString(auctionInfo.title, MAX_TITLE_LENGTH)} </div>
                    <div className='bg-white bg-opacity-90 border border-gray-200 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200'>
                        {/* shortened description: starting price, end date */}
                        <p className='text-gray-600 font-semibold'> Starting at: £{(auctionInfo.price)} </p>
                        {auctionInfo.highest_bid !== 0 && auctionInfo.highest_bid ?
                        (<p className='text-green-600 font-semibold'> Current highest bid: £{auctionInfo.highest_bid}</p>) : auctionInfo.hasEnded ?
                        (<p className='text-red-600 font-semibold'>Auction ended</p>) :
                        (<p className='text-gray-500 font-semibold'>No bids yet</p>)
                        }
                        <p className='text-gray-600 text-sm'>Min bid increment: £{auctionInfo.min_bid_increment}</p>
                        {
                        auctionInfo.end_time ? (
                            auctionInfo.hasEnded ? (<p className='text-sm text-gray-600 mt-1'>Ended: <ReactTimeAgo date={Date.parse(auctionInfo.end_time)} locale="en-GB"/> </p>)
                            : (<p className='text-blue-700 font-medium text-sm'> Ends <ReactTimeAgo date={Date.parse(auctionInfo.end_time)} locale="en-GB"/> </p>)
                        ) : (<></>)
                        }
                    </div>
                    <div className='p-4'>
                    <button className='bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all duration-200 shadow-xl hover:shadow-xl'> <Link to={`/auctions/${auctionInfo.id}`} className='block w-[100%]'> View your auction </Link> </button>  
                 </div> 
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