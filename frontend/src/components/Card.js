import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer.js';
import './card.css';

export default function Card(props) {
  const data = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [img, setimg] = useState("");
  const priceRef = useRef();
  const options = props.options || {};
  const priceOptions = Object.keys(options);
  const foodItem = props.foodItem; // Standardized prop name
  const dispatch = useDispatchCart();

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    if (!foodItem || !foodItem._id) {
      console.error('foodItem or foodItem._id is undefined');
      return;
    }

    let food = data.find(item => item.id === foodItem._id) || {};

    if (food.size === size) {
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
    } else if (food.size !== size) {
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: foodItem.img});
      console.log("Size different, adding a new entry.");
    } else {
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const finalPrice = qty * parseInt(options[size] || 0, 10);

  return (
    <div>
      <div className="card mt-3" style={{ maxHeight: "420px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="Food" style={{ height: "210px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20  text-black rounded" style={{ select: "#FF0000" ,background:" #28a745" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className="m-2 h-100 w-20  text-black rounded" style={{ select: "#FF0000", background:" #28a745" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className='d-inline ms-2 h-100 w-20 fs-5'>
              ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
