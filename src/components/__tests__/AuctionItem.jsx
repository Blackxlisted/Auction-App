import React from 'react'
import headphones from '../../assets/adv-web-headphones.jpg';

function AuctionItem() {
  return (
    <div className='flex flex-col max-w-60 text-center'>
        <div className='p-5'> {/* image container */}
            <img src={headphones} className='w-60'></img>
        </div>
        <div> Headphones </div> {/* title */}
        <div>
            <p> Starting at: £99.99 </p>
            <p> Ends on: Friday 29/10 </p>
        </div> {/* description: starting price, end date */}
        <button className='btn'> Place Bid </button>
    </div>
  )
}

export default AuctionItem