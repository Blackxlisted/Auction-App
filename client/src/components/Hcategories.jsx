import React from 'react'
import electronics from '../assets/electronics.jpg';
import bathroom from '../assets/bathroom.jpeg';
import homeware from '../assets/homeware.avif';



const Hcategories = () => {
  return (
    <div className='flex flex-row justify-items-center mt-2 mb-2 ml-4 mr-4 bg-[#c4d7e6]'>
      <div className="card left-5 glass w-96 grid m-8 p-8">
  <figure>
    <img
      src={electronics}
      alt="electronics!" />
  </figure>
  <div className="card-body p-4">
    <h2 className="card-title">Electronics</h2>
    <p>Laptops, Phones and Other Electronics</p>
    <div className="card-actions justify-center">
      <button className="btn glass ">Bid Now!</button>
    </div>
  </div>
</div>

<div className="card glass w-96 grid left-7 m-8 p-8">
  <figure>
    <img
      src={bathroom}
      alt="bathroom!" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Bathroom Furniture</h2>
    <p>Baths, Showers and Other Bathroom Items</p>
    <div className="card-actions justify-center">
      <button className="btn glass">Bid Now!</button>
    </div>
  </div>
</div>

<div className="card glass w-96 grid m-8 p-8 left-10">
  <figure>
    <img
      src={homeware}
      alt="homeware!" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">HomeWare</h2>
    <p>Sofas, Chairs and Homewares</p>
    <div className="card-actions justify-center">
      <button className="btn glass">Bid Now!</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Hcategories
