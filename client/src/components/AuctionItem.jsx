import React from 'react'
import imageNotFound from '../assets/No-Image-Available.jpg';

const AuctionItem = ({ auctionsInfo }) => {

    return (
      <div className='grid grid-cols-4'>
        {auctionsInfo.map((auctionInfo) => {
          return (
            <div key={auctionInfo.id} className='flex flex-col max-w-60 text-center'>
                {/* image container */}
                <div className='p-5'>
                    <img src={imageNotFound} className='w-60'></img>
                </div>
                {/* title */}
                <div> {auctionInfo.title} </div>
                <div>
                    {/* shortened description: starting price, end date */}
                    <p> Starting at: {auctionInfo.price} </p>
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