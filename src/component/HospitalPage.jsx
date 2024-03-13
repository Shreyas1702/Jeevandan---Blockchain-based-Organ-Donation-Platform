import React from 'react'
import donorForm from './DonorForm'
import { useState , useEffect } from 'react'
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

const HospitalPage =  ({ account, setAccount , state ,setState}) => {
  function donorForm(e){
    e.preventDefault();
    window.location.href ='http://localhost:3000/hospitalPage/DonorForm'
  }

  function ReceiverForm(e){
    e.preventDefault();
    window.location.href ='http://localhost:3000/hospitalPage/ReceiverForm'
  }

  function MatchingForm(e){
    e.preventDefault();
    window.location.href ='http://localhost:3000/hospitalPage/MatchingPage'
  }

  function TransplantPage(e){
    e.preventDefault();
    window.location.href ="http://localhost:3000/hospitalPage/TransplantPage"
  }

  return (
    <div className="hospPage">
      <div className="grp1">
        <div className="cardss">
            <img src="./IMG_8367.PNG" alt="" />
            <div className="card-content" onClick={(e) => donorForm(e)}>
              <h3>Donor Card</h3>
              <p>Click Over here to create Donor Cards</p>
            </div>
        </div>

        <div className="cardss">
            <img src="./IMG_8366.PNG" alt="" />
            <div className="card-content" onClick={(e) => ReceiverForm(e)}>
              <h3>Reciever Card</h3>
              <p>Click Over here to create Reciever Cards</p>
            </div>
        </div>
     </div>
    
    <div className="grp2">
      <div className="cardss">
          <img src="./IMG_8366.PNG" alt="" />
          <div className="card-content" onClick={(e) => MatchingForm(e)}>
            <h3>Reciever Card</h3>
            <p>Click Over here to create Reciever Cards</p>
          </div>
      </div>

      <div className="cardss">
          <img src="./IMG_8366.PNG" alt="" />
          <Link className="card-content" to="/hospitalPage/TransplantPage" state = {{ tId : "773195"}}>
            <h3>Reciever Card</h3>
            <p>Click Over here to create Reciever Cards</p>
          </Link>
      </div>

     </div>

    </div>   
  )
}

export default HospitalPage