import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { loadImage } from '../utils/utils';
import ReactTimeAgo from 'react-time-ago'
import { shortenString } from '../utils/utils';
import Divider from '../pages/Divider';
import Headphone from '../assets/Headphones2.png'
import { filterByCategory, filterByDateDesc, filterByDateAsc, filterByPriceDesc, filterByPriceAsc } from '../utils/AuctionCatalogue/FilterBy';



const AuctionCatalogue = ({ auctionsInfo }) => {
    const MAX_TITLE_LENGTH = 40;
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
      <Divider/>
      <div className=' flex flex-col gap-3'>
      <div className=' flex justify-between items-center gap-8 text-center mt-5 mr-0 overflow-x-scroll'>
          {categories.map((category, index) => (
            <div key={index} onClick={
              () => filterByCategory(category, setFilteredByDate, setFilteredByPrice, auctionsInfo, setFilteredByCategory)
            } 
            className='h-52 w-52 btn font-light cursor-pointer relative m-4 '>
                          <img src={`/images/${cimages[index]}`}
                          alt={category}  // This is for accessibility and describes the image
                          className='object-cover w-full h-full rounded-lg'/>
                          <div
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 text-white font-bold text-lg rounded-lg animate-fadein
                    group-hover:bg-opacity-20 group-hover:text-opacity-100 transition duration-300 ease-in-out"
      >
        {category}
      </div>
            </div>
            
          ))}
        </div>
        <Divider />
        <div className='dropdown dropdown-bottom dropdown-end'>
        <div tabindex="0" role="button" className="btn absolute right-20">Sort</div>
        
        <ul tabindex="0" className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <div className='btn cursor-pointer' onClick={
            () => filterByDateDesc(filteredByCategory, auctionsInfo, setFilteredByDate)
            }>Date desc</div>
          <div className='btn cursor-pointer' onClick={
            () => filterByDateAsc(filteredByCategory, auctionsInfo, setFilteredByDate)
            }>Date asc</div>
          <div className='btn cursor-pointer' onClick={
            () => filterByPriceDesc(setFilteredByDate, filteredByCategory, auctionsInfo, setFilteredByPrice)
            }>Price desc</div>
          <div className='btn cursor-pointer' onClick={
            () => filterByPriceAsc(setFilteredByDate, filteredByCategory, auctionsInfo, setFilteredByPrice)
            }>Price asc</div>
              </ul>
              </div>
              <div className='h-5/6 w-5/6 items-center justify-center pl-60'>
              <img className=' h-40 w-max rounded-3xl' src={Headphone} alt="" />
              </div>
    </div>
  

        <div className='grid grid-cols-[repeat(auto-fill,_minmax(20%,_1fr))] mt-8 gap-8 gap-y-12 justify-items-center p-10 '>
          {items.map((auctionInfo) => {

            return (
              <div key={auctionInfo.id} className='flex flex-col text-black max-w-60 text-center h-full justify-between rounded-2xl shadow-lg border-2 border-gray-300 w-64 p-3 m-2'>
                  {/* image container */}
                  <div className='p-5'>
                    {auctionInfo.image_url ? (
                      <img src={auctionInfo.image_url} className='image-wrapper p-4 rounded-2xl '></img>
                    ) : (
                      <img src={images[auctionInfo.id]} className='object-contain w-full h-40'></img>
                    )}
                      
                  </div>
                  {/* title */}
                  <div className='text-lg font-semibold text-gray-800 mt-4 text-ellipsis'> {shortenString(auctionInfo.title, MAX_TITLE_LENGTH)} </div>
                  <div>
                      {/* shortened description: starting price, end date */}
                      <p className='text-sm text-gray-500 mt-2'> Starting at: £{(auctionInfo.price)} </p>
                      {auctionInfo.highest_bid !== 0 && auctionInfo.highest_bid ?
                      (<p className='text-green-600 bg-green-100 border border-green-300 px-3 py-1 rounded-full font-semibold text-sm'> Current highest bid: £{auctionInfo.highest_bid}</p>) : auctionInfo.hasEnded ?
                      (<p className='text-red-700 bg-gray-100 border border-gray-300 px-3 py-1 rounded-full font-medium text-sm'>Auction ended</p>) :
                      (<p className='text-blue-600 bg-blue-50 border border-blue-300 px-3 py-1 rounded-full font-medium text-sm'>No bids yet</p>)
                      }
                      <p className='text-blue-600 bg-blue-50 border border-blue-300 px-3 py-1 rounded-full font-medium text-sm mt-1'>Min bid increment: £{auctionInfo.min_bid_increment}</p>
                      {
                        auctionInfo.end_time ? (
                          auctionInfo.hasEnded ? (<p className='text-black bg-gray-100 border border-gray-300 px-3 py-1 rounded-full mt-1 font-medium text-sm hover:bg-gray-200 hover:text-gray-700 transition duration-200 ease-in-out'>Ended: <ReactTimeAgo date={Date.parse(auctionInfo.end_time)} locale="en-GB"/> </p>)
                          : (<p className='text-gray-600 bg-gray-100 border border-gray-300 px-3 py-1 rounded-md font-medium text-sm hover:bg-gray-200 hover:text-gray-700 transition duration-200 ease-in-out'> Ends <ReactTimeAgo date={Date.parse(auctionInfo.end_time)} locale="en-GB"/> </p>)
                        ) : (<></>)
                      }
                  </div>
                  {auctionInfo.uid === sub ? ( // checks if auction belongs to logged in user
                      <button className='btn btn-outline glass'> <Link to={`/auctions/${auctionInfo.id}`} className='block w-[100%]'> View your auction </Link> </button>
                    ) : (
                      <button className='btn btn-outline glass'> <Link to={`/auctions/${auctionInfo.id}`} className='block w-[100%]'> View auction </Link> </button>
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