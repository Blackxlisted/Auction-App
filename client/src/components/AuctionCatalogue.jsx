import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { loadImage } from '../utils/utils';
import ReactTimeAgo from 'react-time-ago'
import { shortenString } from '../utils/utils';
import { filterByCategory, filterByDateDesc, filterByDateAsc, filterByPriceDesc, filterByPriceAsc } from '../utils/AuctionCatalogue/FilterBy';


const AuctionCatalogue = ({ auctionsInfo }) => {
    const MAX_TITLE_LENGTH = 100;
    const { user } = useAuth0();
    const [images, setImage] = useState({});
    const categories = ['Health & Household', 'Tools & Home Improvement', 'Home & Kitchen', 'Pet Supplies', 'Cell Phones & Accessories', 'Electronics', 'Video Games', 'Industrial & Scientific', 'Baby Products', 'Office Products', 'Beauty & Personal Care', 'Clothing'];
    const [filteredByCategory, setFilteredByCategory] = useState(null);
    const [filteredByDate, setFilteredByDate] = useState(null);
    const [filteredByPrice, setFilteredByPrice] = useState(null);
    const [items, setItems] = useState(auctionsInfo);

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

    useEffect(() => {
      setItems(filteredByCategory && !filteredByDate && !filteredByPrice ? filteredByCategory : filteredByDate ? filteredByDate : filteredByPrice ? filteredByPrice : auctionsInfo);
    }, [filteredByCategory, filteredByDate, filteredByPrice, auctionsInfo]);

    useEffect(() => {
      console.log("Updated items:", items[0]);
    }, [items]);
    return (
      <>
        <div className='flex flex-row flex-wrap gap-4'>
          {categories.map((category, index) => (
            <div key={index} onClick={
              () => filterByCategory(category, setFilteredByDate, setFilteredByPrice, auctionsInfo, setFilteredByCategory)
            } className='btn cursor-pointer'>{category}</div>
          ))}
        </div>
        <div className='w-[105px] text-center'>
          <div className='btn cursor-pointer' onClick={
            () => filterByDateDesc(filteredByCategory, auctionsInfo, setFilteredByDate)
            }>Date desc</div>
          <div className='btn cursor-pointer' onClick={
            () => filterByDateAsc(filteredByCategory, auctionsInfo, setFilteredByDate)
            }>Date asc</div>
        </div>
        <div className='w-[105px] text-center'>
          <div className='btn cursor-pointer' onClick={
            () => filterByPriceDesc(setFilteredByDate, filteredByCategory, auctionsInfo, setFilteredByPrice)
            }>Price desc</div>
          <div className='btn cursor-pointer' onClick={
            () => filterByPriceAsc(setFilteredByDate, filteredByCategory, auctionsInfo, setFilteredByPrice)
            }>Price asc</div>
        </div>
        <div className='grid grid-cols-4 mt-10'>
          {items.map((auctionInfo) => {

            return (
              <div key={auctionInfo.id} className='flex flex-col max-w-60 text-center'>
                  {/* image container */}
                  <div className='p-5'>
                    {auctionInfo.image_url ? (
                      <img src={auctionInfo.image_url} className='w-60 max-h-64'></img>
                    ) : (
                      <img src={images[auctionInfo.id]} className='w-60'></img>
                    )}
                      
                  </div>
                  {/* title */}
                  <div> {shortenString(auctionInfo.title, MAX_TITLE_LENGTH)} </div>
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
      </>
    )
  
}

export default AuctionCatalogue;