import React from 'react'

export default function Card() {
  return (
    <div>
      <div>
        <div className="card mt-3 " style={{ "width": "18rem", "maxHeight": "360px" }}>
          <img src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=10000&h=1000&dpr=1" className="card-img-top " alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">some text.</p>
            <div className='container w-100'>
              <select className=' bg-success rounded m-2'>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                  )
                })}
              </select>
              <select className='bg-success rounded m-2'>
                <option value="half">Half</option>
                <option value="full">Full</option>
              </select>
              <div className=' m-2 d-inline h-100 fs-5'>Total Price</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

