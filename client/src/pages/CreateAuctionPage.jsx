import React from 'react'
import Sellingsteps from '../components/Sellingsteps'
import AuctionCreation from '../components/AuctionCreation'
import Footer from '../components/Footer';

function CreateAuctionPage() {
  return (
    <>
          <Sellingsteps/>
          <AuctionCreation />
          <Footer />
    </>
  )
}

export default CreateAuctionPage