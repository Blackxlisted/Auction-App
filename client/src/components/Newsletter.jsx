import React from 'react'
import backgroundauction from '../assets/backgroundauction.jpg'

const Newsletter = () => {

  return (
    <div className="relative bg-contain bg-center bg-no-repeat flex items-center justify-center h-screen"
    style={{ backgroundImage: `url(${backgroundauction})` }} >

    <div className="absolute bg-black bg-opacity-40"></div>   

    <div className='w-5/6 h-5/6 flex flex-col items-center justify-center m-auto py-0 px-36 mb-36 gap-8'  > 
      <h1 className='text-white text-5xl font-semibold'>Get Exclusive Auctions on your Email</h1>
      <p className='text-white text-xl'>Subscribe to our Newsletter and Stay Updated</p>
      
      <div className='flex items-center justify-between bg-white w-max h-16 rounded-3xl border-black border-2 border-solid'>
        <input className='w-96 ml-7 border-none outline-none text-black bg-white font-sans text-sm placeholder:italic placeholder:text-slate-400' type='email' placeholder='Your Email id...' />
        <button className='w-52 h-16 rounded-3xl bg-black text-white text-lg cursor-pointer'>Subscribe</button>
        </div> 
   
    </div>
    </div>

  )
}

export default Newsletter
