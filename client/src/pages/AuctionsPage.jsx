import React from 'react'
import AuctionCatalogueContainer from '../components/AuctionCatalogueContainer';
import { Outlet, useParams } from 'react-router-dom';

function AuctionsPage() {
  const { id } = useParams();
  return (
    <>
        {!id ? (
          <>
            <h2>AuctionsPage</h2>
            <AuctionCatalogueContainer/>
          </>
        ) :
        (
          <Outlet /> // if id is present in route (user clicked view bids) then render child
        )}
        
        
    </>
  )
}

export default AuctionsPage