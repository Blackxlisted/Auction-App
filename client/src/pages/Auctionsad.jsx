import React from 'react'
import Auctionad from '../assets/Auctionad.webp'

const auctionsad = () => {
  return (
    <div className=''>
        <div className='h-5/6 w-5/6 items-center justify-center pl-64 p-8 rounded-3xl'>
        <img className='rounded-3xl animate-fadein' src={Auctionad} alt="" />
        </div>
        
    <div className='flex flex-col absolute items-center justify-center  top-2/3 right-1/3'>
    <h2 className='font-semibold text-white subpixel-antialiased text-5xl animate-fadein'>
        Buy your favourite Products here
    </h2>
    </div>   
    </div>
  )
}

export default auctionsad
