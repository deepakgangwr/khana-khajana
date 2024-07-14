import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <div><footer className="py-3 my-4 bg-danger">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><Link className="nav-Link px-2 text-muted" to="/Home">Home</Link></li>
      <li className="nav-item"><Link className="nav-Link px-2 text-muted" to="/login">Login</Link></li>
      <li className="nav-item"><Link to="#" className="nav-Link px-2 text-muted">About</Link></li>
    </ul>
    <p className="text-center text-muted">© 2024 Instafood, Inc</p>
  </footer></div>
  )
}