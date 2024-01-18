import React from 'react'
import donorForm from './DonorForm'
import { useState , useEffect } from 'react'

const HospitalPage = () => {
  function donorForm(e){
    e.preventDefault();
    window.location.href ='http://localhost:3000/hospitalPage/DonorForm'
  }

  return (
    <div className="hospPage">
      <div className="grp1">
        <div className="card">
            <img src="./IMG_8367.PNG" alt="" />
            <div className="card-content" onClick={(e) => donorForm(e)}>
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
    
    <div className="grp2">
      <div className="card">
          <img src="./IMG_8366.PNG" alt="" />
          <div className="card-content">
            <h3>Reciever Card</h3>
            <p>Click Over here to create Reciever Cards</p>
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

    </div>   
  )
}

export default HospitalPage