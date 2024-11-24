import React from 'react'
import flogo from '../assets/flogo.jpg'
import instagram from '../assets/instagram_icon.png'
import pintester from '../assets/pintester_icon.png'
import whatsapp from '../assets/whatsapp_icon.png'

const footer = () => {
  return (
    <div>
      <div className='flex flex-col justify-center items-center gap-12'>
        <div className='flex items-center justify-center bg-white p-4 rounded'>
        <img src={flogo} alt='logo' className="h-16 w-auto" />
        <p className='text-black text-5xl font-bold'>AuctionArc</p>
        </div>
        <ul className='flex list-none gap-12 text-black text-xl'>
            <li className='cursor-pointer'>Company</li>
            <li className='cursor-pointer'>Auctions</li>
            <li className='cursor-pointer'>Offices</li>
            <li className='cursor-pointer'>Contact</li>
        </ul>
        <div className='flex gap-5'>
            <div className='p-2.5 pb-1.5 bg-white border-2 border-solid border-white'>
                <img src={instagram} alt="" />
            </div>
            <div className='p-2.5 pb-1.5 bg-white border-2 border-solid border-white'>
                <img src={pintester} alt="" />
            </div>
            <div className='p-2.5 pb-1.5 bg-white border-2 border-solid border-white'>
                <img src={whatsapp} alt="" />
            </div>
        </div>
        <div className='flex flex-col items-center gap-8 w-full mb-7 text-black text-sm'>
            <hr className='w-9/12 border-none rounded-xl h-2 bg-black'/>
            <p>Copyright @2024 - All Rights Reseverd</p>
        </div>
    </div>
    </div>
  )
}

export default footer
