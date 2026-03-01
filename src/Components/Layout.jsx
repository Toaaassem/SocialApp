import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="bg-purple-50  py-20"><Outlet/></div>
      
      <Footer/>
    </div>
  )
}
