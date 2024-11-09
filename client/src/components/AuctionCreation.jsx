import React, { useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const AUCTION_URL = import.meta.env.VITE_DEVELOPMENT_AUCTIONS_URL;



function AuctionCreation() {
  // const [inputValue, setInputValue] = useState(0);
  // const [increments, setIncrements] = useState([]);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const formRef = useRef(); // Create a ref for the form

  const resetAllFields = (e) => {
    e.preventDefault();
    formRef.current.reset(); // Reset the form using the ref
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // for successful form submit redirect
    
    // gets the form element
    const form = e.currentTarget;
    const data = new FormData(form);
    const entries = Object.fromEntries(data);
    const uid = user.sub;
    const entriesWithUID = {...entries, uid};

    // null checks and setting default values if null
    const { file, end_time, description } = entries;
    const descriptionChecked = description ? description : 'No description provided.'
    const image = file.name ? file.name : 'No-Image-Available.jpg';
    entriesWithUID.file = image;
    //entriesWithUID.price = entriesWithUID.price*100;
    //entriesWithUID.bid_increment = parseFloat(entriesWithUID.bid_increment);

    // converting end_time to db time format
    const utcDateTime = end_time ? new Date(end_time)?.toISOString() : null;
    // if an end time is not provided by user on auction create, delete from post object
    // so db will set default to 1 day from now. Else set end_time in post object
    utcDateTime ? entriesWithUID.end_time = utcDateTime : delete entriesWithUID.end_time
    console.log(entriesWithUID);
    
    axios
      .post(AUCTION_URL, entriesWithUID)
      .then((response) => {
        console.log(response.data);
        console.log(response);
        if (response.statusText === 'Created') {
          navigate('/auctions')
          
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  

  return (
    <form className='grid grid-rows-1 gap-4 mx-[40%]' onSubmit={handleSubmit} ref={formRef}>
        <h3> Create auction</h3>
        <label htmlFor='title'></label>
        <input type="text" placeholder='Enter your title' id='title' name='title' required />
        <label htmlFor='description'></label>
        <input type="text" placeholder='Description' id='description' name='description' />
        <label htmlFor='price'></label>
        <input type="number" id='price' name='price' placeholder='Starting price' required />
        <label htmlFor='min_bid_increment'></label>
        <input type='number' id='min_bid_increment' name='min_bid_increment' step='0.01' placeholder='Minimum bid increment' min='1' required />
        <label htmlFor='file'></label>
        <input type="file" id='file' name='file' />
        <label htmlFor='endDatetime'></label>
        <input type="datetime-local" id='end_time' name='end_time' required />
        <button type='submit' className='btn'> Create Auction </button>
        <button onClick={resetAllFields}>Reset?</button>
    </form>
  )
}

export default AuctionCreation