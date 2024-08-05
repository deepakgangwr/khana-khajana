import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import loginImg from '../images/Signup-img.png';
import signupImg from '../images/signup1.jpg';
import brandImg from '../images/brand.png';
import './nav.css';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [showModal, setShowModal] = useState('');
  const [signupCredentials, setSignupCredentials] = useState({ name: "", email: "", password: "", address: "" });
  const [signinCredentials, setSigninCredentials] = useState({ email: "", password: "" });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSigninPassword, setShowSigninPassword] = useState(false);
  const navigate = useNavigate();

  const handleShow = (modalId) => {
    const currentModalElement = document.getElementById(showModal);
    const newModalElement = document.getElementById(modalId);

    if (currentModalElement) {
      const currentModal = window.bootstrap.Modal.getInstance(currentModalElement);
      if (currentModal) {
        currentModal.hide();
      }
    }

    if (newModalElement) {
      const newModal = new window.bootstrap.Modal(newModalElement);
      newModal.show();
    }

    setShowModal(modalId);
  };

  const handleClose = (modalId) => {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
    setShowModal('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleShow('staticBackdrop2'); // Show the login modal after logout
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch( `${window.location.origin}/api/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: signupCredentials.name,
        email: signupCredentials.email,
        password: signupCredentials.password,
        address: signupCredentials.address,
      })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('userEmail', signinCredentials.email);
      handleClose('staticBackdrop1'); // Close the sign-up modal
      navigate("/");
    } else {
      alert(json.message);
    }
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${window.location.origin}/api/loginUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signinCredentials.email,
        password: signinCredentials.password,
      })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('userEmail', signinCredentials.email);
      handleClose('staticBackdrop2'); // Close the sign-in modal
      navigate("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onSignupChange = (e) => {
    setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value });
  };

  const onSigninChange = (e) => {
    setSigninCredentials({ ...signinCredentials, [e.target.name]: e.target.value });
  };

  const loadCart = () => {
    setCartView(true);
  };

  const toggleSignupPassword = () => {
    setShowSignupPassword(!showSignupPassword);
  };

  const toggleSigninPassword = () => {
    setShowSigninPassword(!showSigninPassword);
  };

  const items = useCart();

  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ fontSize: '1.2rem', background: 'linear-gradient(to right, green, yellowgreen)' }}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#" style={{ fontWeight: 'bold', fontSize: '1.9rem' }}>
            <img src={brandImg} alt="Brand Image" style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '2px' }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-2 active text-light" style={{ fontWeight: 'bold' }} aria-current="page" to="/">𝑲𝒉𝒂𝒏𝒂 - 𝑲𝒉𝒂𝒋𝒂𝒏𝒂</Link>
              </li>
              {localStorage.getItem("token") &&
                <li className="nav-item">
                  <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder">
                    {/* <ListAltIcon className='me-2' />  */}
                  </Link>
                </li>}
            </ul>
            {!localStorage.getItem("token") ?
              <form className="d-flex">
                <button type="button" className="btn bg-white text-success mx-1 rounded-pill" onClick={() => handleShow('staticBackdrop2')}>
                  <LoginIcon className='me-2' /> Login
                </button>
                <button type="button" className="btn bg-white text-success mx-1 rounded-pill" onClick={() => handleShow('staticBackdrop1')}>
                  <PersonAddIcon className='me-2' /> Signup
                </button>
              </form> :
              <div className="d-flex align-items-center">
                <div className="btn bg-white text-success mx-2 d-flex align-items-center rounded-pill" onClick={loadCart}>
                  <Badge color="secondary" badgeContent={items.length}>
                    <ShoppingCartIcon />
                  </Badge>
                  <span className="ms-2">Cart</span>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : ""}
                <Link className="btn bg-white text-success mx-1 d-flex align-items-center rounded-pill" to="/myorder">
                  <ListAltIcon className='me-2' /> My Orders
                </Link>
                <button className="btn bg-white text-danger mx-1 d-flex align-items-center rounded-pill" onClick={handleLogout}>
                  <ExitToAppIcon className='me-2' /> Logout
                </button>
              </div>}
          </div>
        </div>
      </nav>

      {/* Sign Up Modal */}
      <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="container d-flex rounded-3 shadow-lg p-0">
            <div className="w-50 rounded-start overflow-hidden">
              <img src={signupImg} alt="Signup" className=" h-100" style={{ objectFit: 'cover' }} />
            </div>
            <div className="modal-content rounded-start-0 rounded-end">
              <div className="modal-header border-0 rounded-0">
                <h1 className="modal-title fs-5 text-white" id="staticBackdropLabel">
                  <span className="fs-1 fw-bold">𝑺𝒊𝒈𝒏 𝒖𝒑</span>
                </h1>
                <button type="button" className="btn-close" onClick={() => handleClose('staticBackdrop1')} aria-label="Close"></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSignupSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      name="name"
                      value={signupCredentials.name}
                      onChange={onSignupChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      name="email"
                      value={signupCredentials.email}
                      onChange={onSignupChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="address"
                      name="address"
                      value={signupCredentials.address}
                      onChange={onSignupChange}
                      placeholder="Enter your address"
                      required
                    />
                  </div>
                  <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      className="form-control form-control-lg pe-5" // Add padding on the right to avoid text overlap
                      id="password"
                      name="password"
                      value={signupCredentials.password}
                      onChange={onSignupChange}
                      placeholder="Enter your password"
                      required
                    />
                    <span
                      className="position-absolute top-50 mt-3 end-0 translate-middle-y me-2" // Adjust for better positioning
                      onClick={toggleSignupPassword}
                      style={{ cursor: 'pointer', zIndex: 1 }} // Ensures it’s clickable and on top
                    >
                      {showSignupPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100 mt-3 py-2 rounded-pill fs-5"
                  >
                    Sign Up
                  </button>
                </form>
                <div className="text-center mt-3">
                  <p className="mb-0">Already have an account? <a href="#" onClick={() => handleShow('staticBackdrop2')} className="text-decoration-none">Login</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Sign In Modal */}
      <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="container d-flex main-sign">
            <div className="w-50 rounded-start image-sign">
              <img src={loginImg} alt="Login Image" className="w-100 h-100 object-cover" />
            </div>
            <div className="modal-content rounded-0 rounded-end" style={{ borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: '#f0f0f0' }}>
              <div className="modal-header rounded-0">
                <div className="w-100">
                  <h1 className="modal-title fs-5 text-light" id="staticBackdropLabel">
                    <span className="fs-1 fw-bold fst-italic">Welcome Back!</span>
                  </h1>
                </div>
                <button type="button" className="btn-close" onClick={() => handleClose('staticBackdrop2')} aria-label="Close"></button>
              </div>
              <div className="modal-body p-4 mt-4">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      name='email'
                      value={signinCredentials.email}
                      onChange={onSigninChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type={showSigninPassword ? "text" : "password"}
                      className="form-control form-control-lg pe-5"
                      id="password"
                      name='password'
                      value={signinCredentials.password}
                      onChange={onSigninChange}
                      placeholder="Enter your password"
                      required
                    />
                    <span
                      className="position-absolute top-50 mt-3 end-0 translate-middle-y me-3"
                      onClick={toggleSigninPassword}
                      style={{ cursor: 'pointer', zIndex: 1 }}
                    >
                      {showSigninPassword ? <VisibilityOff /> : <Visibility />}
                    </span>
                  </div>
                  <button type="submit" className="btn btn-success py-2 rounded-pill w-100 mt-3 fs-5" onClick={handleSigninSubmit}>
                    Login
                  </button>
                </form>
                <div className="text-center mt-3">
                  <p className="mb-0 text-muted">Don't have an account? <a href="#" className='text-decoration-none' onClick={() => handleShow('staticBackdrop1')} style={{ color: '#007bff' }}>Sign up</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
