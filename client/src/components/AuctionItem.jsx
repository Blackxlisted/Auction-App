import React from 'react'
import imageNotFound from '../assets/No-Image-Available.jpg';
import { useState } from 'react';
 



const AuctionItem = ({ auctionsInfo }) => {
    const [image, setImage] = useState(null);

    const loadImage = async (imageName) => {
      try {
          const imageModule = await import(`../assets/${imageName}.jpg`);
          setImage(imageModule.default);
      } catch (error) {
          console.error('Error loading image', error);
      }
    };

    return (
      <div className='grid grid-cols-4 mt-10'>
        {auctionsInfo.map((auctionInfo) => {
          loadImage(auctionInfo.image);
          return (
            <div key={auctionInfo.id} className='flex flex-col max-w-60 text-center'>
                {/* image container */}
                <div className='p-5'>
                    <img src={image} className='w-60'></img>
                </div>
                {/* title */}
                <div> {auctionInfo.title} </div>
                <div>
                    {/* shortened description: starting price, end date */}
                    <p> Starting at: £{(auctionInfo.price)/100} </p>
                    <p> Ends on: {auctionInfo.end_time} </p>
                </div>
                <button className='btn'> Place Bid </button>
            </div>
          )
        })}
      </div>
    )
  
}

export default AuctionItem