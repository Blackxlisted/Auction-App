import React from "react";
import { useState } from 'react';
import Hamburger from "../assets/hamburger-menu.svg";
import { NavLink } from 'react-router-dom';

const Nav = ()  => {
    const [toggle, setToggle] = useState(false);
    
    return (
        <nav>
            <div onClick={() => { 
                setToggle(prevToggle => !prevToggle)

            }}>

                <img src={Hamburger} alt="menu-icon" className="menu-icon w-10 absolute top-5 right-5"></img>
            </div>
            <ul className= {`nav ${toggle ? 'show' : 'hide'} flex flex-row gap-4 p-4 fixed right-6 top-6`}>
                <li> <NavLink to='/' className='link w-10'>
                Home</NavLink> </li>
                <li> <NavLink to='/create-auction' className='link'>
                Create Auction</NavLink> </li>
                <li> <NavLink to='/auctions' className='link'>
                Auctions</NavLink> </li>
            </ul>
        </nav>
    );
};

export default Nav;