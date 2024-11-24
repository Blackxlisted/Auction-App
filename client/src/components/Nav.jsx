import React from "react";
import { useState } from 'react';

import Hamburger from "../assets/hamburger-menu.svg";
import logo from '../assets/logo1.png';
import { NavLink } from 'react-router-dom';
import UserContainer from "./UserContainer";

import { useDispatch } from 'react-redux';

import { loginUser } from '../features/user/userSlice.js';
import { useAuth0 } from '@auth0/auth0-react';

const Nav = ()  => {
    const [toggle, setToggle] = useState(false);
    const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();
    const dispatch = useDispatch();

    console.log(
        isAuthenticated,
        user,
        isLoading
    )

    // const user = useSelector((state) => state.user.user);
    isAuthenticated ? dispatch(loginUser(user)) : '';
    

    return (
        <nav>
            <div className="navbar  bg-white text-primary-content">
  <div className="navbar-start">
    <div className="">
      <div tabIndex={0} role="button" className="btn btn-accent lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
    </div>
    <button className="btn btn-neutral text-xl">AuctionArc</button>
  </div>
  <div className="navbar-center hidden lg:flex text-center">
    <ul className="menu menu-horizontal px-64">
    <li><a><NavLink to='/' className='target:shadow-lg font-bold text-lg'>Home</NavLink></a></li>
      <li><a> <NavLink to='/create-auction' className='target:shadow-lg font-bold text-lg'>Create Auction</NavLink> </a></li>
      <li>
          <summary> <NavLink to='/auctions' className='target:shadow-lg font-bold text-lg'>Auctions</NavLink></summary>
        </li>
        <li><a> 
         <NavLink to='/my-auctions' className='target:shadow-lg font-bold text-lg pr-12'>My Auctions</NavLink>
         </a>
         </li> 
         </ul> 
         <div  className="nav-login-auction-cart">
          <UserContainer  user={user} login={loginWithRedirect} logout={logout} />
          </div>     
  </div>
</div>
</nav>

    );
};

export default Nav;