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
    const response = await fetch("http://localhost:5000/api/createuser", {
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
      handleClose('staticBackdrop1'); // Close the sign-up modal
      navigate("/");
    } else {
      alert(json.message);
    }
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginUser", {
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
                <Link className="nav-link fs-2 mx-3 active text-light" style={{ fontWeight: 'bold' }} aria-current="page" to="/">𝑲𝒉𝒂𝒏𝒂 - 𝑲𝒉𝒂𝒋𝒂𝒏𝒂</Link>
              </li>
              {localStorage.getItem("token") &&
                <li className="nav-item">
                  <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder">My Orders</Link>
                </li>}
            </ul>
            {!localStorage.getItem("token") ?
              <form className="d-flex">
                <button type="button" className="btn bg-white text-success mx-1" onClick={() => handleShow('staticBackdrop2')}>
                  <LoginIcon /> Login
                </button>
                <button type="button" className="btn bg-white text-success mx-1" onClick={() => handleShow('staticBackdrop1')}>
                  <PersonAddIcon /> Signup
                </button>
              </form> :
              <div>
                <div className="btn bg-white text-success mx-2" onClick={loadCart}>
                  <Badge color="secondary" badgeContent={items.length}>
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : ""}
                <button className="btn bg-white text-danger mx-1" onClick={handleLogout}>Logout</button>
              </div>}
          </div>
        </div>
      </nav>
      {/* Sign Up Modal */}
      <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="container d-flex main-sign">
            <div className="w-50 rounded-start image-sign">
              <img src={signupImg} alt="Signup Image" />
            </div>
            <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: '#f0f0f0' }}>
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-success" id="staticBackdropLabel">
                  <span className="fs-1 fw-bold">𝑺𝒊𝒈𝒏 𝒖𝒑</span>
                </h1>
                <button type="button" className="btn-close" onClick={() => handleClose('staticBackdrop1')} aria-label="Close"></button>
              </div>
              <div className="modal-body p-4 mt-2">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control form-control-sm" name='name' value={signupCredentials.name} onChange={onSignupChange} placeholder="Enter your name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control form-control-sm" id="exampleInputEmail1" name='email' value={signupCredentials.email} onChange={onSignupChange} placeholder="Enter your email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control form-control-sm" name='address' value={signupCredentials.address} onChange={onSignupChange} placeholder="Enter your address" />
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      className="form-control form-control-sm"
                      value={signupCredentials.password}
                      onChange={onSignupChange}
                      name='password'
                      placeholder="Enter your password"
                    />
                    <button type="button" className="btn btn-outline-secondary" onClick={toggleSignupPassword} style={{ marginLeft: '10px' }}>
                      {showSignupPassword ? <VisibilityOff /> : <Visibility />}
                    </button>
                  </div>
                  <button type="submit" className="btn btn-outline-success w-100 mt-3" onClick={handleSignupSubmit}>
                    Continue
                  </button>
                </form>
                <div className="text-center mt-3">
                  <p className="mb-0">Already have an account? <a href="#" onClick={() => handleShow('staticBackdrop2')}>Login</a></p>
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
        <img src={loginImg} alt="Login Image" />
      </div>
      <div className="modal-content" style={{ borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: '#f0f0f0' }}>
        <div className="modal-header">
          <div className="text-center w-100">
            <h2 className="fs-4 text-success mb-2">Welcome Back!</h2>
            <h1 className="modal-title fs-5 text-success" id="staticBackdropLabel">
              <span className="fs-1 fw-bold">𝑺𝒊𝒈𝒏 𝒊𝒏</span>
            </h1>
          </div>
          <button type="button" className="btn-close" onClick={() => handleClose('staticBackdrop2')} aria-label="Close"></button>
        </div>
        <div className="modal-body p-4 mt-2">
          <p className="text-center mb-4 text-muted">"The secret of getting ahead is getting started."</p>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control form-control-sm" id="exampleInputEmail1" name='email' value={signinCredentials.email} onChange={onSigninChange} placeholder="Enter your email" />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type={showSigninPassword ? "text" : "password"}
                className="form-control form-control-sm"
                value={signinCredentials.password}
                onChange={onSigninChange}
                name='password'
                placeholder="Enter your password"
              />
              <button type="button" className="btn btn-outline-secondary" onClick={toggleSigninPassword} style={{ marginLeft: '10px' }}>
                {showSigninPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
            <button type="submit" className="btn btn-outline-success w-100 mt-3" onClick={handleSigninSubmit}>
              Continue
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="mb-0 text-muted">Don't have an account? <a href="#" onClick={() => handleShow('staticBackdrop1')} style={{ color: '#007bff' }}>Sign up</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



    </div>
  );
}
