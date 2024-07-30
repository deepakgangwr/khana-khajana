import React from 'react';

const LoginModal = () => {
  return (
    <div className="modal modal-lg fade" id="loginModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="container d-flex main-sign">
          <div className="w-50 rounded-start image-sign">
            <img className="" src="https://popmenucloud.com/cdn-cgi/image/width=1920,height=1920,format=auto,fit=scale-down/wmzltkrx/8c4cf3f5-c756-4f81-aa1f-e2a3f7700fb9.jpg" alt="login" />
          </div>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-success text-centered" id="loginModalLabel">
                <span className="fs-4 fw-bold">Instafood</span>
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-header">
              <p className="modal-title fs-5 text-secondary" id="loginModalLabel">
                Sign In
              </p>
            </div>
            <div className="modal-body p-4 mt-4">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" />
                </div>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
