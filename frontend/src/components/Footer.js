import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-3 bg-danger" style={{ fontSize: '1.2rem', background: 'linear-gradient(to right, green, yellowgreen)' }}>
      <ul className="nav justify-content-center border-bottom pb-3 mb-3" style={{ marginBottom: '0' }}>
        <li className="nav-item"><Link className="nav-link px-2 text-muted" to="/Home">Home</Link></li>
        <li className="nav-item"><Link className="nav-link px-2 text-muted" to="/login">Login</Link></li>
        <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">About</Link></li>
      </ul>
      <p className="text-center text-muted mb-0">© 2024 Instafood, Inc</p>
    </footer>
  );
}
