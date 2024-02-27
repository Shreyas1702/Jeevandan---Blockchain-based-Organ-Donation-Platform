import React from 'react'
import {ethers} from "ethers"
import abi from "./../contracts/enterDetails.json";
import { useState , useEffect } from 'react';
import axios from 'axios'
import HospitalPage from "./HospitalPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const SignIn = ({ account, setAccount , state ,setState , loggedIn ,  setLoggedIn}) => {
    
    const [longitudes  , setLongitude] = React.useState();
    const [latitudes  , setLatitude] = React.useState();
    const [data , setData] = useState({
        username : "",
        id : 0,
        email : "",
        lngt : 0,
        ltd : 0,
        timestamp : 0,
        meta_address : "",
    })

    const [func , setFunc] = useState(false);

    function getLoc(e) {
        e.preventDefault();
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
    }

    useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x4605Bce646d9bB34F180730E7858908Fd6932852";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
        }
        console.log(ethereum)
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(await signer.getAddress());
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }

      setFunc(false);
    };

    connectWallet()

} , [account , func]);

  const SubmitForm = async (e) => {
    e.preventDefault();
    await setFunc(true);
    data.ltd = latitudes;
    data.lngt = longitudes;
    console.log(data);
    const {contract}  = state;
    console.log(contract)
    const transaction = await contract.registerHospital(data.username , data.id , data.meta_address);
    await transaction.wait();

    await axios.post('http://localhost:8000/register', data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    console.log(transaction)
    console.log("Transaction Done");

    setLoggedIn(true)

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
    <div className="hosp-reg-form">
        <div className='hosp-register'>
            <form class="row g-3 needs-validation" novalidate>
                <div className="col-md-12">
                    <label for="validationCustom01" className="form-label" style={{fontSize : "20px", color : "#5ec576"}}>Hospital Name</label>
                    <input name='username' type="text" className="form-control" onChange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}} id="validationCustom01" required/>
                    <div className="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div className="col-md-12">
                    <label for="validationCustom02" className="form-label" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}} >Hospital Id</label>
                    <input name='id' type="text" className="form-control" id="validationCustom02" onChange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}} required/>
                    <div className="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div className="col-md-12">
                    <label for="validationCustomUsername" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}} className="form-label">Email</label>
                    <div className="input-group has-validation">
                    <input name='email' type="text" className="form-control" id="validationCustomUsername" onChange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}} aria-describedby="inputGroupPrepend" required/>
                    <div className="invalid-feedback">
                        Please choose a username.
                    </div>
                    </div>
                </div>                    
                    <div className="col-md-4" style={{marginTop : "30px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576"}}>Longitutde</span>
                            <input name='lngt' type="number" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "50px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend" value={longitudes} required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>


                    <div className="col-md-4" style={{marginTop : "30px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576"}}>Latitude</span>
                            <input name='ltd' type="number" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "50px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend" value={latitudes} required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4" style={{marginTop : "30px" , marginLeft : "0px"}}>
                        <button  className="btn btn-primary" onClick={(e) => getLoc(e)} style={{fontSize : "15px" , borderRadius : "4px"}}>Get Current Co-ordinate</button>
                    </div>

                <div className="col-md-12">
                    <label for="validationCustom05" className="form-label" style={{fontSize : "20px",marginTop : "8px", color : "#5ec576"}}>Wallet Address</label>
                    <input name='meta_address' onChange={(event) => handleChange(event)} type="text" className="form-control" id="validationCustom05" style={{height: "35px", fontSize : "18px"}} required/>
                    <div className="invalid-feedback">
                    Please provide wallet Address.
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-check" style={{marginTop : "8px"}}>
                    <input className="form-check-input" type="checkbox" style={{width: "20px" ,
    height: "20px" }} value="" id="invalidCheck" required/>
                    <label className="form-check-label" for="invalidCheck" style={{fontSize : "17px"}}>
                        &nbsp;&nbsp;&nbsp;Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">
                        You must agree before submitting.
                    </div>
                    </div>
                </div>
                <div className="col-12">
                    <button className="btns btn-primary" style={{width : "100%" , fontSize : "22px"}} type="submit" onClick={(event) => SubmitForm(event)}>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignIn