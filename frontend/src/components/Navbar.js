import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import loginImg from '../images/login.jpg';
import './nav.css';

export default function Navbar() {
  const [showModal, setShowModal] = useState('');

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


  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  let [address, setAddress] = useState("");
  let navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }
    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]
    })
    // console.log(latlong)
    let [lat, long] = latlong
    console.log(lat, long)
    const response = await fetch("http://localhost:5000/api/auth/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latlong: { lat, long } })

    });
    const { location } = await response.json()
    console.log(location);
    setAddress(location);
    setCredentials({ ...credentials, [e.target.name]: location })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem('token', json.authToken)
      navigate("/login")

    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success" style={{ fontSize: '1.2rem' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ fontWeight: 'bold' }}>𝑲𝒉𝒂𝒏𝒂 - 𝑲𝒉𝒂𝒋𝒂𝒏𝒂</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => handleShow('staticBackdrop2')}>Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => handleShow('staticBackdrop1')}>SignUp</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="container d-flex main-sign">
            <div className="w-50 rounded-start image-sign">
              <img src={loginImg} alt="Burger Image" />
            </div>
            <div className="modal-content">
              <div className="d-flex">
                <h1 className="fs-2 text-success text-center fst-italic fw-bold" id="staticBackdropLabel">
                  𝑲𝒉𝒂𝒏𝒂 - 𝑲𝒉𝒂𝒋𝒂𝒏𝒂
                </h1>
                <button type="button" className="btn-close" onClick={() => handleClose('staticBackdrop1')} aria-label="Close"></button>
              </div>
              <div className="modal-header">
                <p className="modal-title fs-4 text-secondary text-center" id="staticBackdropLabel">
                  Sign Up
                </p>
              </div>
              <div className="modal-body p-2 mt-1">
                <form>
                  <div className="mb-2">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control"name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"></div>
                  </div>
                  <div className="">
                    <label htmlFor="name" className="form-label">Address</label>
                    <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-2">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn rounded-pill btn-bs-gray-600 w-10 mt-3 py-2 btn-success">Click for current Location </button>
            </div>
                  <div className="mb-2">
                    <label htmlFor="name" className="form-label">Password</label>
                    <input type="text" className="form-control"value={credentials.password} onChange={onChange} name='password' />
                  </div>
                  <button type="submit" className="btn rounded-pill btn-bs-gray-600 w-100 mt-3 py-2 btn-outline-success">
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

      <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="container d-flex main-sign">
            <div className="w-50 rounded-start image-sign">
              <img className='' src={loginImg} alt="Burger Image" />
            </div>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-success text-centered" id="staticBackdropLabel">
                  <span className="fs-4 fw-bold">𝑲𝒉𝒂𝒏𝒂 - 𝑲𝒉𝒂𝒋𝒂𝒏𝒂</span>
                </h1>
                <button type="button" className="btn-close" onClick={() => handleClose('staticBackdrop2')} aria-label="Close"></button>
              </div>
              <div className="modal-header text-center">
                <p className="modal-title fs-5 text-secondary" id="staticBackdropLabel">
                  Sign in
                </p>
              </div>
              <div className="modal-body p-4 mt-4">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"></div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                  </div>
                  <button type="submit" className="btn rounded-pill btn-bs-gray-600 w-100 mt-3 py-2 btn-outline-success">
                    Continue
                  </button>
                  <div className="text-center mt-3">
                    <p className="mb-0">Don't have an account? <a href="#" onClick={() => handleShow('staticBackdrop1')}>SignUp</a></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
