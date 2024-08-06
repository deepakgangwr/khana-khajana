import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    try {
      const response = await fetch(`https://khana-khajana.onrender.com/api/myOrderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      setOrderData(result.orderData.order_data || []);
    } catch (error) {
      console.error("Failed to fetch order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          {orderData.length > 0 ? (
            orderData.map((data, index) => (
              data.map((item, idx) => (
                <React.Fragment key={`${index}-${idx}`}>
                  {item.Order_date ? (
                    <div className='m-auto mt-5'>
                      <h4>{new Date(item.Order_date).toLocaleDateString()}</h4>
                      <hr />
                    </div>
                  ) : (
                    <div className='col-12 col-md-6 col-lg-3'>
                      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                        <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className='container w-100 p-0' style={{ height: "38px" }}>
                            <span className='m-1'>{item.qty}</span>
                            <span className='m-1'>{item.size}</span>
                            <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                              ₹{item.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))
            ))
          ) : (
            <div>No orders found</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
