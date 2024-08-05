import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../images/login.jpg';

export default function Signup({ handleClose }) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", address: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`{window.location.origin}/api/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        address: credentials.address,
      })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="container d-flex main-sign">
          <div className="w-50 rounded-start image-sign">
            <img src={loginImg} alt="Burger Image" />
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
                  <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="nameHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" name='address' value={credentials.address} onChange={onChange} aria-describedby="nameHelp" />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
                </div>
                <button type="submit" className="btn rounded-pill btn-bs-gray-600 w-100 mt-3 py-2 btn-outline-success" onClick={handleSubmit}>
                  Continue
                </button>
              </form>
              <div className="text-center mt-3">
                <p className="mb-0">Already have an account? <a href="#" onClick={() => handleClose('staticBackdrop2')}>Login</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
