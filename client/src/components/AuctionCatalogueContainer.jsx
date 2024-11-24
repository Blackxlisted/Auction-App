import React from 'react'
import { getAuctions } from '../api/api.js';
import { useState, useEffect } from 'react';
import Auctionsad from '../pages/Auctionsad.jsx';
import AuctionCatalogue from './AuctionCatalogue';


function AuctionCatalogueContainer() {

    const [auctionsInfo, setAuctionsInfo] = useState([]);

    useEffect(() => {
        getAuctions()
        .then((response) => {
            console.log(response);
            setAuctionsInfo(response);
        })
        .catch((error) => {
            console.log(response);
            console.error(error);
        })
        
    }, []);  

    return (
        <>
        <Auctionsad/>
        <AuctionCatalogue auctionsInfo={auctionsInfo}/>
        </>
    )
}

export default AuctionCatalogueContainer