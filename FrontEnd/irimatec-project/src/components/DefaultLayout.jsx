import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function DefaultLayout() {
  return (
    <div>
      <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    </div>
  )
}

export default DefaultLayout
