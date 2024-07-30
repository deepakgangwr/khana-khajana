import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import loginImg from '../images/Signup-img.png';
import signupImg from '../images/signup1.jpg';
import brandImg from '../images/brand.png';
import './nav.css';

export default function Navbar() {
  const [showModal, setShowModal] = useState('');
  const [signupCredentials, setSignupCredentials] = useState({ name: "", email: "", password: "", address: "" });
  const [signinCredentials, setSigninCredentials] = useState({ email: "", password: "" });
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
      alert("Enter Valid Credentials");
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

  return (
    <div>
      <nav className="navbar navbar-expand-lg " style={{ fontSize: '1.2rem', background: 'linear-gradient(to right, green, yellowgreen)'}}>
        <div className="container-fluid ">
          <a className="navbar-brand d-flex align-items-center" href="#" style={{ fontWeight: 'bold', fontSize: '1.9rem' }}>
            <img src={brandImg} alt="Brand Image" style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '2px' }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-2 mx-3 active text-light"  style={{ fontWeight: 'bold' }} aria-current="page" to="/">𝑲𝒉𝒂𝒏𝒂 - 𝑲𝒉𝒂𝒋𝒂𝒏𝒂</Link>
              </li>
              {localStorage.getItem("token") &&
                <li className="nav-item">
                  {/* <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myorder" >My Orders</Link> */}
                </li>}
            </ul>
            {!localStorage.getItem("token") ?
              <form className="d-flex">
                <button type="button" className="btn bg-white text-success mx-1" onClick={() => handleShow('staticBackdrop2')}>Login</button>
                <button type="button" className="btn bg-white text-success mx-1" onClick={() => handleShow('staticBackdrop1')}>Signup</button>
              </form> :
              <div className="d-flex">
                <Link className="btn bg-white text-primary mx-1" to="/myorder">My cart</Link>
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
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-success " id="staticBackdropLabel">
                  <span className="fs-1 fw-bold" style={{ marginLeft: '170px' }}>𝑺𝒊𝒈𝒏 𝒖𝒑</span>
                </h1>
                <button type="button" className="btn-close" style={{ opacity: 1 }} onClick={() => handleClose('staticBackdrop1')} aria-label="Close"></button>
              </div>
              <div className="modal-body p-3 mt-2">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={signupCredentials.name} onChange={onSignupChange} aria-describedby="nameHelp" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={signupCredentials.email} onChange={onSignupChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"></div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" name='address' value={signupCredentials.address} onChange={onSignupChange} aria-describedby="addressHelp" />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={signupCredentials.password} onChange={onSignupChange} name='password' />
                  </div>
                  <button type="submit" className="btn rounded-pill btn-bs-gray-600 w-100 mt-3 py-2 btn-outline-success" onClick={handleSignupSubmit}>
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
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-success " id="staticBackdropLabel">
                  <span className="fs-1 fw-bold" style={{ marginLeft: '170px' }}>𝑺𝒊𝒈𝒏 𝒊𝒏</span>
                </h1>
                <button type="button" className="btn-close" style={{ opacity: 1 }} onClick={() => handleClose('staticBackdrop2')} aria-label="Close"></button>
              </div>
              <div className="modal-body p-3 mt-2">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={signinCredentials.email} onChange={onSigninChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"></div>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={signinCredentials.password} onChange={onSigninChange} name='password' />
                  </div>
                  <button type="submit" className="btn rounded-pill btn-bs-gray-600 w-100 mt-3 py-2 btn-outline-success" onClick={handleSigninSubmit}>
                    Continue
                  </button>
                </form>
                <div className="text-center mt-3">
                  <p className="mb-0">Don't have an account? <a href="#" onClick={() => handleShow('staticBackdrop1')}>Sign up</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
