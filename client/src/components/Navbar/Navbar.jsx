import React, { useState } from 'react'
import './Navbar.css'
import logo1 from '../Assets/ logo1.png'
import auction_list from '../Assets/auction_list.png'
import { Link, NavLink, useSearchParams } from 'react-router-dom'

const Navbar = () => {

    const[menu,setMenu] = useState("auction");
  
  
    return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo1} alt="" />
        </div>
    <ul className="nav-menu">
        <li onClick={()=>{setMenu("auction")}}><Link style={{textDecoration:'none'}} to='/'>Auctions</Link>{menu==="auction"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("auctioncategory")}}><Link style={{textDecoration:'none'}} to='/auctioncategory'>Auction Category</Link>{menu==="customerservice"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("auctioncesults")}}><Link style={{textDecoration:'none'}} to='/auctionresults'>Auction Results</Link>{menu==="auctionresults"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("calendar")}}><Link style={{textDecoration:'none'}} to='/calendar'>Calendar</Link>{menu==="calendar"?<hr/>:<></>}</li>
    </ul> 
    <div className="nav-login-auction-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/itemscart'><img src={auction_list} alt=""/></Link>
        <div className="nav-cart-count">0</div>
    </div>
    </div>
  )
}

export default Navbar
