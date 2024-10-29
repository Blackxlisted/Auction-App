import React from 'react'
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

function HomeLayoutPage() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default HomeLayoutPage