import React from 'react'
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import Hcategories from '../components/Hcategories';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

function MainLayoutPage() {
  return (
    <>
      <Nav />
      <Outlet />
      <Hcategories/>
      <Newsletter/>
      <Footer/>
    </>
  )
}

export default MainLayoutPage