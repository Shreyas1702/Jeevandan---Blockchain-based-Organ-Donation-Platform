import React from 'react'
import { useState , useEffect } from 'react'
const HospitalPage = () => {
  
  return (
    <div className="hospPage">
     <div className="card">
        <img src="./IMG_8367.PNG" alt="" />
        <div className="card-content">
          <h3>Donor Card</h3>
          <p>Click Over here to create Donor Cards</p>
        </div>
     </div>

     <div className="card">
        <img src="./IMG_8366.PNG" alt="" />
        <div className="card-content">
          <h3>Reciever Card</h3>
          <p>Click Over here to create Reciever Cards</p>
        </div>
     </div>
    </div>
  )
}

export default HospitalPage