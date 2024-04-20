import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import DashAside from './DashAside';
import { toast , ToastContainer } from 'react-toastify';
const Matching = ({ account, setAccount , state ,setState}) => {
const [data  , setData] = React.useState({
  id : 0,
  bloodgrp : "",
  organ : "",
});

const {sign , nft , living} = state;

const [ptlist , setptlist] = React.useState([]);

const SubmitForm = async (e) => {
  e.preventDefault();

  console.log("id",data.id);
  try{
    const {contract}  = state;
    console.log(contract)
    const transaction = await contract.passbloodgrpid(data.bloodgrp , data.id , data.organ , process.env.REACT_APP_NFTAddress);
    const toastId = toast.info('Organ Matching in Progress', { autoClose: false });
    const rc = await transaction.wait();

    var datas = await contract.getMatchedArray();
    // const d = await datas.wait();

    console.log(datas)

    if(datas.length > 0){
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
          toast.update(toastId, { render: 'Transaction Successful', type: 'success', autoClose: 5000 });
      })
      .catch(function (error) {
          console.log(error);
          toast.error(error)
      });
    }
    else{
      toast.update(toastId, { render: 'Sorry no Match Found', type: 'success', autoClose: 5000 });
      }
    }
     catch (error) {
    console.error("Error during transaction:", error.revert.args[0]);
    toast.error(error.revert.args[0]);
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

const startProcess = async (id , r_id , r_add) => {
  try{
    console.log(id);
    console.log(r_id);
    console.log(r_add);

    const toastId = toast.success('Reciever Confirmed', { autoClose: 5000 });
    console.log(data);
    const {contract_nft} = state;

    const Id = data.id;
    const organ = data.organ;
    const d_hosp = account;
    var stage = 1;
    if(d_hosp == r_add)
      stage = 3;
    const d  = {
      id,
      Id,
      organ,
      d_hosp,
      stage,
    }
    
    var t_id;

    console.log(stage);

    await axios.post('http://localhost:8000/transplant' , d).then((response) => {
      console.log(response);
      t_id = response.data.data;
      console.log(t_id);
    });
    console.log(Id , r_id , d_hosp , r_add , t_id , organ , sign);
    await contract_nft.TransDetails(Id , r_id  , d_hosp , r_add , t_id , organ, stage , sign)
    
    setTimeout(() => {
      window.location.href = "http://localhost:3000/dashboard"
    },6000)
  }
  catch(error){
    toast.error(error.revert.args[0]);
  }

}

const tbody = () => {
  var num = 1;
  return ptlist.map((data) => {
    return (
      <tr style={{borderBottom : "1px solid #D3D3D3" , marginBottom : "20px"}}>
        <td style={{textAlign : "center" , paddingRight : "30px" , paddingTop : "10px" , paddingBottom : "10px" , paddingLeft : "10px"}}>{num++}</td>
        <td style={{textAlign : "center" , paddingRight : "30px" , paddingTop : "10px" , paddingBottom : "10px" , paddingLeft : "30px"}}>{data.name}</td>
        <td style={{textAlign : "center" , paddingRight : "30px" , paddingTop : "10px" , paddingBottom : "10px" , paddingLeft : "30px"}}>{data.address.username}</td>
        <td style={{textAlign : "center" , paddingRight : "30px" , paddingTop : "10px" , paddingBottom : "10px" , paddingLeft : "30px"}}>{data.address.id}</td>
        <td style={{textAlign : "center" , paddingRight : "30px" , paddingTop : "10px" , paddingBottom : "10px" , paddingLeft : "30px"}}>
          <ul style={{display : "flex" , flexDirection : "row"}}>
            <li style={{listStyle : "none"}} ><button className = "item-buttons" onClick={() => startProcess(data._id , data.id , data.address.meta_address)}>Accept</button></li>
          </ul>
        </td>
      </tr>
    )
  });
}




  return (
    <div style={{display : "flex"}}>
    <ToastContainer/>
    <DashAside account={account} style={{marginTop : "20px" , marginLeft : "50px" , width : "90%"}} />
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
              <th style={{textAlign : "center" , paddingRight : "30px" , paddingLeft : "30px"}}>Hospital Name</th>
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