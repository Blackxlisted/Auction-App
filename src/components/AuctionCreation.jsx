import React from 'react'

function AuctionCreation() {
  return (
    <form className='grid grid-rows-1 gap-4 mx-[40%]'>
        <h3> Create auction</h3>
        <label htmlFor='title'></label>
        <input type="text" id='title' name='title' />
        <label htmlFor='description'></label>
        <input type="number" id='description' name='description' />
        <label htmlFor='file'></label>
        <input type="file" id='file' name='file' />
        <label htmlFor='end-datetime'></label>
        <input type="datetime-local" id='end-datetime' name='end-datetime' />
        <button type='submit' className='btn'>Create Auction</button>
    </form>
  )
}

export default AuctionCreation