import React from 'react'
import AuctionItem from './AuctionItem';

function AuctionCatalogue({ auctionsInfo }) {
  return (
    <div>
        <AuctionItem auctionsInfo={auctionsInfo}/>
    </div>
  )
}

export default AuctionCatalogue