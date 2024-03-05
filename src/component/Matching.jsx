import React from 'react'
import { useState } from 'react';
import axios from 'axios';
const Matching = ({ account, setAccount , state ,setState}) => {
const [data  , setData] = React.useState({
  id : 0,
  bloodgrp : "",
  organ : "",
});

const SubmitForm = async (e) => {
  e.preventDefault();

  console.log("id",data.id);
  try{
    const {contract}  = state;
    console.log(contract)
    const transaction = await contract.passbloodgrpid(data.bloodgrp , data.id , data.organ);
    const rc = await transaction.wait();
    console.log("Transaction Done");
    console.log(transaction);

    var datas = await contract.getMatchedArray();
    // const d = await datas.wait();
    // console.log("Transaction Done");
    console.log(datas);

    var list = [];

    for(var i = 0 ; i < datas.length ; i++){
      var num = (parseInt(datas[i].toString()));
      list.push(num);
      console.log(num);
    }

    console.log(list)
    
    await axios.post(`http://localhost:8000/MatchingPage/${data.id}`, list)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
    }
     catch (error) {
    console.error("Error during transaction:", error);
  }
  }

function handleChange(e){

  e.preventDefault();
  const {name  , value} = e.target;

  setData((prevData) => ({
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
                <div class="input-group mb-1" style={{height : "30px" , width : "40%"  , marginTop : "50px"}}>
                  <label class="input-group-text" style={{ fontSize : "18px" , backgroundColor : "#5ec576" , color : "white"}} for="inputGroupSelect01">Blood Group</label>
                  <select class="form-select" name="bloodgrp" id="inputGroupSelect01" onChange={(event) => handleChange(event)} style={{ fontSize : "18px"}}>
                      <option selected>Select</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                  </select>
                </div>
                <div class="input-group mb-1" style={{height : "30px" , width : "40%" , marginLeft : "215px" , marginTop : "50px"}}>
                  <label class="input-group-text" style={{ fontSize : "18px" , backgroundColor : "#5ec576" , color : "white"}} for="inputGroupSelect01">Organ</label>
                  <select class="form-select" name="organ" id="inputGroupSelect01" onChange={(event) => handleChange(event)} style={{ fontSize : "18px"}}>
                      <option selected>Select</option>
                      <option value="kidney">Kidney</option>
                      <option value="pancreas">Pancreas</option>
                      <option value="liver">Liver</option>
                  </select>
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