import React from 'react';
import axios from 'axios';

const AUCTION_URL = import.meta.env.VITE_DEVELOPMENT_AUCTIONS_URL;

const handleSubmit = (e) => {
  e.preventDefault();

  // Get the form element
  const form = e.currentTarget;

  // Create a new FormData object from the form
  const data = new FormData(form);

  // Convert the FormData object to key-value pairs
  const entries = Object.fromEntries(data); // Use `.entries()` method
  console.log(entries);
  
  axios
    .post(AUCTION_URL, entries)
    .then((response) => {
      console.log(response.data);
      resetAllFields();
    })
    .catch((error) => {
      console.log(error);
    });
}

function AuctionCreation() {
  return (
    <form className='grid grid-rows-1 gap-4 mx-[40%]' onSubmit={handleSubmit}>
        <h3> Create auction</h3>
        <label htmlFor='title'></label>
        <input type="text" id='title' name='title' />
        <label htmlFor='description'></label>
        <input type="text" id='description' name='description' />
        <label htmlFor='price'></label>
        <input type="number" id='price' name='price' />
        <label htmlFor='file'></label>
        <input type="file" id='file' name='file' />
        <label htmlFor='end-datetime'></label>
        <input type="datetime-local" id='end-datetime' name='end-datetime' />
        <button type='submit' className='btn'>Create Auction</button>
    </form>
  )
}

export default AuctionCreation