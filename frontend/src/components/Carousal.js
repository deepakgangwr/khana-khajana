import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Carousal() {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain ! important" }}>
      <div className="carousel-inner" id='carousel'>
        <div className="carousel-caption" style={{ zIndex: "10" }}>
          <div className="carousel-innertest pb-1" id='test'><p>𝑲𝒉𝒂𝒏𝒂 - 𝑲𝒉𝒂𝒋𝒂𝒏𝒂</p></div>
          <div className="carousel-innertest1 pb-3" id='test1'><p>Quick, Delicious Meals Delivered to Your Doorstep Instantly</p></div>
          <form className="d-flex justify-content-center pb-3">
            <input className="form-control me-2 p-2 w-75" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light " type="submit">Search</button>
          </form>
        </div>
        <div className="carousel-item active">
          <img src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=10000&h=1000&dpr=1" className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=10000&h=1000&dpr=1" className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=10000&h=1000&dpr=1" className="d-block w-100" style={{ filter: "brightness(60%)" }} alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
