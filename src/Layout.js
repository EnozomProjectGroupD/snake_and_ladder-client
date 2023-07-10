import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar';

export default function Layout() {
  return (
    <>
   <Navbar></Navbar>
    <div className='container'>

    <Outlet/>
    </div>
    </>
  )
}
