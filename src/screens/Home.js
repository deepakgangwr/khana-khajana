import React from 'react'
import Navbar from '../components/Navbar'
import Carousal from '../components/Carousal'
import Card from '../components/Card'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div> 
        <div><Navbar/></div>
        <div><Carousal/></div>
        <div><Card/><Card/><Card/><Card/><Card/></div>
        <div><Footer/></div>
    </div>
      
  )
}
