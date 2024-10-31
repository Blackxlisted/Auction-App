import React, { useState, useEffect } from 'react'
import { getAuctionItem } from '../api/api.js'
import { Outlet, useParams } from 'react-router-dom';
import { loadImage } from '../utils/utils.js';

function AuctionItemPage() {

  const { id } = useParams();
  const [auctionInfo, setAuctionInfo] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
   
    async function fetchItem () {
        try {
            const item = await getAuctionItem(id);
            setAuctionInfo(item);
            console.log(item);
            console.log(item.image);
            const importedImage = await loadImage(item.image);
            console.log(importedImage);
            setImage(importedImage);
        } catch (error) {
            console.error(error);
        }
    } 

    fetchItem(id);
    
  }, [id]);



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
    </div>
  )
}

export default AuctionItemPage