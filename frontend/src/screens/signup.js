import React, { useState } from 'react'


export default function signupModal({ closeModal }) {

  return (
    <div className="custom-modal bg-opacity-10">
      <div className="custom-modal-dialog">
        <div className="custom-modal-content">
          <div className="custom-modal-header bg-dark d-flex justify-content-between">
            <h5 className="modal-title text-white fw-bold">Create Playlist</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="custom-modal-body" style={{ backgroundColor: "#474848" }}>
            <form>
              <div className="mb-3">
                <label for="name" className="form-label">Name</label>
                <input type="text" className="form-control" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="custom-modal-footer bg-dark d-flex flex-row-reverse">
            <button type="button" className="btn btn-outline-light mx-2">Create</button>
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </div>

  )
}

