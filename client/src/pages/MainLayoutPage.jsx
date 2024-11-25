import React from 'react'
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function MainLayoutPage() {
  return (
    <>
      <Nav />
      <Outlet />

    </>
  )
}

export default MainLayoutPage