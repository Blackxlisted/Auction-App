import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { loadImage } from '../utils/utils';
import ReactTimeAgo from 'react-time-ago'
import { shortenString } from '../utils/utils';

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
    
    const filterByCategory = (category) => {
      setFilteredByDate(null);
      setFilteredByPrice(null);
      const filteredAuctions = [];
      auctionsInfo.forEach((item) => {
        if (item.category === category) {
          filteredAuctions.push(item);
        };
      });
      setFilteredByCategory(filteredAuctions);
    }

    const filterByDateDesc = () => {
      const result = filteredByCategory ? filteredByCategory : [...auctionsInfo];
      const sortedResult = result.sort((a, b) => new Date(b.end_time) - new Date(a.end_time));
      setFilteredByDate([...sortedResult]);
    }

    const filterByDateAsc = () => {
      const result = filteredByCategory ? filteredByCategory : [...auctionsInfo];
      const sortedResult = result.sort((a, b) => new Date(a.end_time) - new Date(b.end_time));
      setFilteredByDate([...sortedResult]);
    }

    const filterByPriceDesc = () => {
      setFilteredByDate(null);
      const result = filteredByCategory ? filteredByCategory : [...auctionsInfo];
      
      const sortedResult = result.sort((a, b) => {
        const cost_a = a.price >= a?.highest_bid ? a.price : a.highest_bid;
        const cost_b = b.price >= b?.highest_bid ? b.price : b.highest_bid;
        return (
          cost_b - cost_a
        )
      });
      setFilteredByPrice([...sortedResult]);
    };
   
    const filterByPriceAsc = () => {
      setFilteredByDate(null);
      const result = filteredByCategory ? filteredByCategory : [...auctionsInfo];
      const sortedResult = result.sort((a, b) => {
        const cost_a = a.price >= a?.highest_bid ? a.price : a.highest_bid;
        const cost_b = b.price >= b?.highest_bid ? b.price : b.highest_bid;
        return (
          cost_a - cost_b
        )
      });
      setFilteredByPrice([...sortedResult]);
    };

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
            <div key={index} onClick={() => filterByCategory(category)} className='btn cursor-pointer'>{category}</div>
          ))}
        </div>
        <div className='w-[105px] text-center'>
          <div className='btn cursor-pointer' onClick={() => filterByDateDesc()}>Date desc</div>
          <div className='btn cursor-pointer' onClick={() => filterByDateAsc()}>Date asc</div>
        </div>
        <div className='w-[105px] text-center'>
          <div className='btn cursor-pointer' onClick={() => filterByPriceDesc()}>Price desc</div>
          <div className='btn cursor-pointer' onClick={() => filterByPriceAsc()}>Price asc</div>
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