import React from 'react'
import AuctionCatalogueContainer from '../components/AuctionCatalogueContainer';
import { Outlet, useParams } from 'react-router-dom';
import Footer from '../components/Footer.jsx'

function AuctionsPage() {
  const { id } = useParams();
  return (
    <>
        {!id ? (
          <>
            <AuctionCatalogueContainer/>
            <Footer></Footer>
          </>
        ) :
        (
          <Outlet /> // if id is present in route (user clicked view bids) then render child
        )}
        
        
    </>
  )
}

export default AuctionsPage