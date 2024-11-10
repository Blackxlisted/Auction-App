import React from 'react'
import electronics from '../assets/electronics.jpg';
import bathroom from '../assets/bathroom.jpeg';
import homeware from '../assets/homeware.avif';



const Hcategories = () => {
  return (
    <div className='flex items-center m-8'>
      <div className="card glass w-96 grid">
  <figure>
    <img
      src={electronics}
      alt="electronics!" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Life hack</h2>
    <p>How to park your car at your garage?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Learn now!</button>
    </div>
  </div>
</div>

<div className="card glass w-96 grid">
  <figure>
    <img
      src={bathroom}
      alt="bathroom!" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Life hack</h2>
    <p>How to park your car at your garage?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Learn now!</button>
    </div>
  </div>
</div>

<div className="card glass w-96 grid">
  <figure>
    <img
      src={homeware}
      alt="homeware!" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Life hack</h2>
    <p>How to park your car at your garage?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Learn now!</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Hcategories
