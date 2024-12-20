import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { loadImage } from '../utils/utils';
import ReactTimeAgo from 'react-time-ago'

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
          //auctionInfo.price = parseFloat(auctionInfo.price);
          //auctionInfo.highest_bid = parseFloat(auctionInfo.highest_bid);

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
                {auctionInfo.uid === sub ? ( // checks if auction belongs to logged in user
                    <button className='btn'> <Link to={`/auctions/${auctionInfo.id}`} className='block w-[100%]'> View your auction </Link> </button>
                  ) : (
                    <button className='btn'> <Link to={`/auctions/${auctionInfo.id}`} className='block w-[100%]'> View auction </Link> </button>
                  )
                }
                
            </div>
          )
        })}
      </div>
    )
  
}

export default AuctionItem