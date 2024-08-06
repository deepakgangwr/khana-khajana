import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../images/Signup-img.png';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

export default function Login() {
  const [signinCredentials, setSigninCredentials] = useState({ email: "", password: "" });
  const [showSigninPassword, setShowSigninPassword] = useState(false);
  const navigate = useNavigate();

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://khana-khajana.onrender.com/api/loginUser`, {
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
      navigate("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onSigninChange = (e) => {
    setSigninCredentials({ ...signinCredentials, [e.target.name]: e.target.value });
  };

  const toggleSigninPassword = () => {
    setShowSigninPassword(!showSigninPassword);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card" style={{ width: '400px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <img src={loginImg} className="card-img-top" alt="Login" />
        <div className="card-body">
          <h1 className="card-title text-center text-success">
            <LoginIcon className='me-2' /> Login
          </h1>
          <form onSubmit={handleSigninSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" value={signinCredentials.email} onChange={onSigninChange} />
            </div>
            <div className="mb-3 input-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type={showSigninPassword ? 'text' : 'password'} className="form-control" id="password" name="password" value={signinCredentials.password} onChange={onSigninChange} />
              <button type="button" className="btn btn-outline-secondary" onClick={toggleSigninPassword}>
                {showSigninPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
