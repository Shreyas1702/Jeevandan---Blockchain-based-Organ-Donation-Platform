import React from 'react'
import { useState } from 'react';
import axios from 'axios';
const Matching = ({ account, setAccount , state ,setState}) => {
const [data  , setData] = React.useState({
  id : 0,
  bloodgrp : "",
  organ : "",
});

const [ptlist , setptlist] = React.useState([]);

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
    console.log("Transaction Done");
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
        setptlist(response.data.data)
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

const startProcess = async (id) => {
  console.log(data);
  const Id = data.id;
  const organ = data.organ;
  const d  = {
    id,
    Id,
    organ
  }

  await axios.post('http://localhost:8000/transplant' , d).then((response) => {
    console.log(response);
  })
}

const tbody = () => {
  var num = 1;
  return ptlist.map((data) => {
    return (
      <tr style={{borderBottom : "1px solid #D3D3D3" , marginBottom : "20px"}}>
        <td style={{textAlign : "center" , paddingRight : "30px" , paddingTop : "10px" , paddingBottom : "10px" , paddingLeft : "10px"}}>{num++}</td>
        <td style={{textAlign : "center" , paddingRight : "30px" , paddingTop : "10px" , paddingBottom : "10px" , paddingLeft : "30px"}}>{data.name}</td>
        <td style={{textAlign : "center" , paddingRight : "30px" , paddingTop : "10px" , paddingBottom : "10px" , paddingLeft : "30px"}}>{data.address.username}</td>
        <td style={{textAlign : "center" , paddingRight : "30px" , paddingTop : "10px" , paddingBottom : "10px" , paddingLeft : "30px"}}>{data.address.email}</td>
        <td style={{textAlign : "center" , paddingRight : "30px" , paddingTop : "10px" , paddingBottom : "10px" , paddingLeft : "30px"}}>{data.address.id}</td>
        <td style={{textAlign : "center" , paddingRight : "30px" , paddingTop : "10px" , paddingBottom : "10px" , paddingLeft : "30px"}}>
          <ul style={{display : "flex" , flexDirection : "row"}}>
            <li style={{listStyle : "none"}} ><button className = "item-buttons" onClick={() => startProcess(data._id)}>Accept</button></li>
          </ul>
        </td>
      </tr>
    )
  });
}




  return (
    <div style={{display : "flex"}}>
            <aside style={{marginTop : "20px" , marginLeft : "50px" , width : "12%"}}>
                <div class="top">
                <div class="logo">
                    <h2 style={{fontSize : "2rem" , marginTop : "1rem"}}>
                    <span style={{ color: "#5ec576" }}>Jeeva</span>ndan
                    </h2>
                </div>
                <div class="close" id="close-btn">
                    <span class="material-icons-sharp">close</span>
                </div>
                </div>
                <div class="sidebar">
                <a href="/dashboard">
                    <span class="material-icons-sharp"> grid_view </span>
                    <h3>Dashboard</h3>
                </a>
                <a href="/dashboard/DonorForm" className='acc_hov' style={{backgroundColor : "#5ec567" , borderRadius : "10px" , color : "white"}}>
                  <span class="material-icons-sharp"> person_outline </span>
                  <h3>{account.slice(0, 6) + "...." + account.slice(34, 42)}</h3>
                </a>
                <a href="/dashboard/DonorForm">
                    <span class="material-icons-sharp"> person_outline </span>
                    <h3>Donor Entry</h3>
                </a>
                <a href="/dashboard/ReceiverForm">
                    <span class="material-icons-sharp"> receipt_long </span>
                    <h3>Reciever Entry</h3>
                </a>
                <a href="/dashboard/MatchingPage" class="active">
                    <span class="material-icons-sharp"> insights </span>
                    <h3>Organ Matching</h3>
                </a>

                <a href="/dashboard/DonorForm">
                    <span class="material-icons-sharp"> add </span>
                    <h3>Living Donation</h3>
                </a>
                <a href="#">
                    <span class="material-icons-sharp"> logout </span>
                    <h3>Logout</h3>
                </a>
                </div>
            </aside>
    <div className="MatchingPage">
      <h1 style={{textAlign : "center" , color : "#5ec567" , marginTop : "60px"}}>Organ Matching Process</h1>
       <div className='hosp-register'>
            <form class="row g-3 needs-validation" novalidate>
                <div className="col-md-12">
                    <label for="validationCustom01" className="form-label" style={ptlist.length == 0 ? {fontSize : "20px", color : "#5ec576", marginTop:"40px"} : {fontSize : "20px", color : "#5ec576", marginTop:"40px"}}>Donor ID</label>
                    <input name='id' type="text" className="form-control" style={{height: "40px" , fontSize : "18px"}} id="validationCustom01" onChange={(event) => handleChange(event)}required/>
                    <div className="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="input-group mb-1" style={ptlist.length == 0 ? {height : "30px" , width : "40%"  , marginTop : "60px"} : {height : "30px" , width : "37%"  , marginTop : "30px"}}>
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
                <div class="input-group mb-1" style={ptlist.length == 0 ? {height : "30px" , width : "40%" , marginLeft : "140px" , marginTop : "60px"} : {height : "30px" , width : "37%" , marginLeft : "190px" , marginTop : "30px"}}>
                  <label class="input-group-text" style={{ fontSize : "18px" , backgroundColor : "#5ec576" , color : "white"}} for="inputGroupSelect01">Organ</label>
                  <select class="form-select" name="organ" id="inputGroupSelect01" onChange={(event) => handleChange(event)} style={{ fontSize : "18px"}}>
                      <option selected>Select</option>
                      <option value="kidney">Kidney</option>
                      <option value="pancreas">Pancreas</option>
                      <option value="liver">Liver</option>
                  </select>
                </div>
                <div className="col-12">
                    <button className="btns btn-primary" style={ptlist.length == 0 ? {width : "100%" , fontSize : "22px", marginTop: "60px"} : {width : "100%" , fontSize : "22px", marginTop: "20px"}} onClick={(event) => SubmitForm(event)} type="submit">Start Organ Matching</button>
                </div>
            </form>
        </div>

        <div className="list-all" style={ ptlist.length == 0 ? { visibility : "hidden"} : {marginBottom : "50px"}}>
          <table>
            <tr style={{borderBottom : "1px solid black"}}>
              <th style={{textAlign : "center" , paddingRight : "30px" , paddingLeft : "10px"}}>Sr No.</th>
              <th style={{textAlign : "center" , paddingRight : "30px" , paddingLeft : "30px"}}>Name</th>
              <th style={{textAlign : "center" , paddingRight : "30px" , paddingLeft : "30px"}}>Hsopital Name</th>
              <th style={{textAlign : "center" , paddingRight : "30px" , paddingLeft : "30px"}}>Mail</th>
              <th style={{textAlign : "center" , paddingRight : "30px" , paddingLeft : "30px"}}>Hospital Id</th>
              <th style={{textAlign : "center" , paddingRight : "30px" , paddingLeft : "30px"}}></th>
            </tr>
            {tbody()}
          </table>
        </div>
    </div>
    </div>
  )
}

export default Matching