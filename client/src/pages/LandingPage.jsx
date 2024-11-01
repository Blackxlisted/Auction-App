import React from 'react'
import hero1 from '../assets/hero1.png'


const LandingPage = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>New Auction Items Only</h2>
        <div>
            <div className="hero-hand-icon">
                <p>
                    New
                </p>
            </div>
            <p>Items</p>
            <p>for Everyone</p>
        </div>
        <div className="hero-latest-btn">
            <div>Latest Auction</div>
        </div>
      </div>
      <div className="hero-right"></div>
      <img src={hero1} alt="" />
    </div>
  )
}

export default LandingPage