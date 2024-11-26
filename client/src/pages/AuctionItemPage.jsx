import React, { useState, useEffect } from 'react'
import { getAuctionItem, getBidsByItemId } from '../api/api.js'
import { useParams } from 'react-router-dom';
import { loadImage } from '../utils/utils.js';
import { useAuth0 } from '@auth0/auth0-react';
import BidsCatalogue from '../components/BidsCatalogue.jsx';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago'


// utils
import { fetchAuctionItem } from '../utils/AuctionItemPage/fetchAuctionItem.js';
import { fetchBids } from '../utils/AuctionItemPage/fetchBids.js';
import { setAmountBid } from '../utils/AuctionItemPage/InsertBid/setAmountBid.js';
import { notifyUsers } from '../utils/AuctionItemPage/InsertBid/notifyUsers.js';
import Divider from './Divider.jsx';

function AuctionItemPage() {
    const { user } = useAuth0();
    const sub = user?.sub;
    const name = user?.name;
    const { id } = useParams();
    const [auctionInfo, setAuctionInfo] = useState({});
    const [image, setImage] = useState(null);
    const [bids, setBids] = useState([]);
    const ADD_BID_URL = 'http://localhost:5005/api/bids/add';
    const [currentPrice, setCurrentPrice] = useState(0);
    const [bidIncrement, setBidIncrement] = useState(0);
    const [hasInput, setHasInput] = useState(false);
    const [customIncrement, setCustomIncrement] = useState('');

    useEffect(() => {
        fetchAuctionItem(id, getAuctionItem, setBidIncrement, setAuctionInfo, loadImage, setImage);
    }, [id]);

    useEffect(() => {
        fetchBids(id, getBidsByItemId, setBids, setCurrentPrice);
    }, [currentPrice]);

    async function insertBid (uid, item_id, customIncrement) {
        
        try {
            const auctionItem = {...auctionInfo};
            const amount_bid = await setAmountBid(customIncrement, auctionItem, currentPrice, setCurrentPrice);
            
            const { end_time, hasEnded } = auctionItem;
            const item_end_time = end_time;
            const entries = { uid, name, item_id, amount_bid, item_end_time, hasEnded, sub }; // uid=owner of auction, name/sub = bidder (logged in user)
            console.log('auction item', auctionItem);
            console.log('entries to bid insert', entries);
            axios
                .post(ADD_BID_URL, entries)
                .then((response) => {
                    console.log(response.data);
                    notifyUsers(auctionItem, amount_bid, bids, uid, item_id, name);
                })
                .catch((error) => {
                    console.log(error);
                });
            
            
        } catch (error) {
            console.error('Error fetching bids insertBid()', error);
        }
        
    }

    

    return (
        <>
            {console.log(currentPrice)}
            <div key={auctionInfo.id} className='container mx-auto max-h-3xl p-6 '>
                {/* image container */}
                <div className='flex h-4/6 w-4/6 flex-col gap-8 items-center justify-items-center ml-48'>
                    {auctionInfo.image_url ? 
                    (<img src={auctionInfo.image_url} className='max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-lg p-10 shadow-lg'></img>) 
                    : (<img src={image} className=''></img>)}
      
                <div className='flex-1 '>
                {/* title */}
                <div className='text-3xl font-bold text-gray-800'> {auctionInfo.title} </div>
                <div className="rating">
                <input type="radio" name="rating-1" className="mask mask-star" />
                <input type="radio" name="rating-1" className="mask mask-star" defaultChecked />
                <input type="radio" name="rating-1" className="mask mask-star" />
                <input type="radio" name="rating-1" className="mask mask-star" />
                <input type="radio" name="rating-1" className="mask mask-star" />
</div>
<div>
<label className="flex cursor-pointer gap-2">
  <span className="label-text"></span>
  <input type="checkbox" value="synthwave" className="toggle theme-controller" />
  <span className="label-text text-black">Save to Watch List</span>
</label>
</div>
<div>
    {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-outline btn-warning" onClick={()=>document.getElementById('my_modal_3').showModal()}>Auction Arc's Choice</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <p className="py-4 text-white">Auction Arc's Choice highlights highly rated, well-priced products available to ship immediately.</p>
  </div>
</dialog>

</div>

                <Divider/> 
                <div>
                    {/* full description */}
                    <p className='text-2xl font-semibold text-green-600'> Starting at: £{(auctionInfo.price)} </p>
                    {auctionInfo.end_time ? 
                    (
                        auctionInfo.hasEnded ? (<p className='text-sm text-gray-500'>Ended: <ReactTimeAgo date={Date.parse(auctionInfo.end_time)} locale="en-GB"/> </p>)
                        : (<p className='text-sm text-gray-500'> Ends <ReactTimeAgo date={Date.parse(auctionInfo.end_time)} locale="en-GB"/> </p>)
                    )
                    : (<></>)}
                    <p className='text-gray-700 leading-relaxed'> {auctionInfo.description} </p>
                </div> 
              
            <div>
                {sub === auctionInfo.uid ? ( // if auction item user id matches logged in user user id
                        <h3 className='text-gray-700 leading-relaxed'>Current Bids</h3>
                    ) : auctionInfo.hasEnded == true ? // if auction has ended
                    (                     
                        <h3 className='text-red-600 leading-relaxed'>Auction expired</h3>
                    ) : bids[0]?.uid !== sub ? ( // if the latest bid uid does not equal logged in users id
                        <div className=''>
                            <label htmlFor='increment'></label>
                            <input type='number' name='increment' className='w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700' value={customIncrement} onChange={(e) => {setCustomIncrement(e.target.value); setHasInput(e.target.value)}} step='0.01' min={(!isNaN(currentPrice) && !isNaN(bidIncrement)) ? (currentPrice + bidIncrement) : auctionInfo.price + bidIncrement} placeholder='Set your own amount'/>

                            <div className='rounded-2xl pt-4 pb-4'>
                            {hasInput ? 
                            (<button type='submit' className=' btn glass' onClick={() => insertBid(sub, auctionInfo.id, customIncrement)}>Place custom bid</button>)
                            : (<button className='btn glass ' onClick={() => {insertBid(sub, auctionInfo.id)}}>Place bid £{currentPrice ? (parseFloat(currentPrice+bidIncrement)) : (parseFloat(auctionInfo.price+bidIncrement))}</button>)}
                            </div>
                            
                        </div>
                    ) : (<p className='text-gray-700 leading-relaxed p-2'>You hold highest bid</p>)} </div>
            <section>
                <div className="bids-container max-h-40 w-full overflow-y-auto bg-gradient-to-b from-blue-50 to-blue-100 border border-gray-200 rounded-lg"
                >
                    <div className="bid-info justify-between items-center w-full p-3 bg-blue-100 border-blue-300 rounded-md">
                    <BidsCatalogue bids={bids} className='text-lg text-gray-600 font-sans font-medium border-2' itemInfo={auctionInfo}/>
                    </div>
                    </div>
                    </section>
                    </div>
                    </div>
                    </div>
        </>
    )
}

export default AuctionItemPage