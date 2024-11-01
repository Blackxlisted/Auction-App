import React from "react";
import { useState, useEffect } from 'react';
import Hamburger from "../assets/hamburger-menu.svg";
import { NavLink } from 'react-router-dom';
import UserContainer from "./UserContainer";
import { useDispatch, useSelector} from 'react-redux';
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
            <div onClick={() => { 
                setToggle(prevToggle => !prevToggle)

            }}>

                <img src={Hamburger} alt="menu-icon" className="menu-icon w-10 absolute top-5 right-5"></img>
            </div>
            {/* flex flex-row gap-4 p-4 fixed right-6 top-6 items-center */}
            <ul className= {`nav ${toggle ? 'show' : 'hide'} nav-menu`}>
                <li> <NavLink to='/' className='link'>
                Home</NavLink> </li>
                <li> <NavLink to='/create-auction' className='link'>
                Create Auction</NavLink> </li>
                <li> <NavLink to='/auctions' className='link'>
                Auctions</NavLink> </li>
                <div className="nav-login-auction-cart">
                    <UserContainer user={user} login={loginWithRedirect} logout={logout} />
                  </div>            
            </ul>
        </nav>
    );
};

export default Nav;