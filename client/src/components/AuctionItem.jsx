import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { loadImage } from '../utils/utils';


const AuctionItem = ({ auctionsInfo }) => {
    const { user } = useAuth0();
    const [images, setImage] = useState({});

    const sub = user?.sub; // userID of current logged in user
    console.log(sub);

    useEffect(() => {
      async function setImages() {
        const localImages = {}
        for (const auctionInfo of auctionsInfo) {
          try {
            const url = auctionInfo.image;
            const id = auctionInfo.id;
            const imageModule = await loadImage(url);
            localImages[id] = imageModule;
          } catch (error) {
            console.error(error);
          }
          
        };
        
        setImage({...localImages});
      };
      setImages();
      
    }, [auctionsInfo])

    return (
      <div className='grid grid-cols-4 mt-10'>
        {auctionsInfo.map((auctionInfo) => {
          //loadImage(auctionInfo.image)
          
          return (
            <div key={auctionInfo.id} className='flex flex-col max-w-60 text-center'>
                {/* image container */}
                <div className='p-5'>
                    <img src={images[auctionInfo.id]} className='w-60'></img>
                </div>
                {/* title */}
                <div> {auctionInfo.title} </div>
                <div>
                    {/* shortened description: starting price, end date */}
                    <p> Starting at: £{(auctionInfo.price)/100} </p>
                    {auctionInfo.highest_bid !== 0 && auctionInfo.highest_bid ? (<p> Current highest bid: £{auctionInfo.highest_bid/100}</p>) : (<p>No bids yet</p>)}
                    <p> Ends on: {auctionInfo.end_time} </p>
                </div>
                {auctionInfo.uid === sub ? (
                    <button className='btn'> <Link to={`/auctions/${auctionInfo.id}`}> View your auction </Link> </button>
                  ) : (
                    <button className='btn'> <Link to={`/auctions/${auctionInfo.id}`}> View auction </Link> </button>
                  )
                }
                
            </div>
          )
        })}
      </div>
    )
  
}

export default AuctionItem