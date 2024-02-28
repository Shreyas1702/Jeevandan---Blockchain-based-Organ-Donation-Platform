import React from 'react'
import { useState } from 'react';
const Matching = ({ account, setAccount , state ,setState}) => {



const [id  , setid] = React.useState();

const SubmitForm = async (e) => {
  e.preventDefault();

  console.log("id",id);
  try{
    const {contract}  = state;
    console.log(contract)
    const transaction = await contract.matchDonorwReceiver(id);
    const rc = await transaction.wait();
    console.log("Transaction Done");
    // await axios.post(`http://localhost:8000/hospitalPage/MatchingPage${Id}`, data)
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
    }
     catch (error) {
    console.error("Error during transaction:", error);
  }
  }

function handleChange(e){

  e.preventDefault();
  const {name  , value} = e.target;

  setid((prevData) => ({
      ...prevData,
      [name] : value
  }))

  console.log(name);
  console.log(value);
}




  return (
    <div className="MatchingPage">
       <div className='hosp-register'>
            <form class="row g-3 needs-validation" novalidate>
                <div className="col-md-12">
                    <label for="validationCustom01" className="form-label" style={{fontSize : "20px", color : "#5ec576", marginTop:"90px"}}>Donor ID</label>
                    <input name='id' type="text" className="form-control" style={{height: "40px" , fontSize : "18px"}} id="validationCustom01" onChange={(event) => handleChange(event)}required/>
                    <div className="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div className="col-12">
                    <button className="btns btn-primary" style={{width : "100%" , fontSize : "22px", marginTop: "100px"}} onClick={(event) => SubmitForm(event)} type="submit">Start Organ Matching</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Matching