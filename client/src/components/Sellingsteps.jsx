import React from 'react'
import Step1 from '../assets/Step1.png'
import Step2 from '../assets/Step2.png'
import Step3 from '../assets/Step3.png'




const Sellingsteps = () => {
  return (
    <div className='flex items-center justify-center gap-10 p-6'>
   
    <div className="skeleton h-96 w-96 mb-16 animate-fadein">
        <img src={Step1} alt="" />
        <p  className='text-lg text-grey font-bold' >STEP 1</p>
        <p className='text-base text-black font-semibold'>Share Item Details</p>
        <p className='text-sm text-black font-medium'>Use keywords like brand, model or unique info </p>
    </div>
    <div className="skeleton h-96 w-96 mb-16 animate-fadein">
        <img src={Step2} alt="" />    
        <p  className='text-lg text-grey font-bold' >STEP 2</p>
        <p className='text-base text-black font-semibold'>Find a match</p>
        <p className='text-sm text-black font-medium'>We'll search our catalogue to find similar items.</p>  
    </div>
    <div className="skeleton h-96 w-96 mb-16 animate-fadein">
        <img src={Step3} alt="" />
        <p  className='text-lg text-grey font-bold' >STEP 3</p>
        <p className='text-base text-black font-semibold'>Edit and list</p>
        <p className='text-sm text-black font-medium'>You can preview or make changes before listing your item.</p>
    </div>

    </div>
  )
}

export default Sellingsteps
