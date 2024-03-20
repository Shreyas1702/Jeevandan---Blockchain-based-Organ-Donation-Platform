import React from 'react'
import {ethers} from "ethers"
import abi from "./../contracts/register.json";
import abis from "./../contracts/register.json";
import Navbar from "./Navbar"
import { useState , useEffect } from 'react';
import axios from 'axios'
import HospitalPage from "./HospitalPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
      const contractAddress = "0x65e5Fc36c3D8906CD25c358cF892d8fE1389Fb7A";
      const contractABI = abi.abi;

      const contractAddress_NFT = "0x2EC823963665DDa4e857806D967dC2b9001edE4f";
      const contractABI_NFT = abis.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
        }
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const contract_nft = await new ethers.Contract(
          contractAddress_NFT,
          contractABI_NFT,
          signer
        );
        setState({ provider, signer, contract, contract_nft });
      } catch (error) {
        toast.error(error);
      }

      setFunc(false);
    };

    connectWallet()

} , [account , func]);

  const SubmitForm = async (e) => {
    e.preventDefault();
    await setFunc(true);
    if(latitudes != undefined)
      data.ltd = latitudes;
    if(longitudes != undefined)
      data.lngt = longitudes;
    const {contract}  = state;

    const transaction = await contract.registerHospital(data.username , data.id , data.meta_address);
    const toastId = toast.info('Transaction in Progress', { autoClose: false });
    await transaction.wait();

  await axios.post('http://localhost:8000/register', data)
  .then((response) => {
    console.log(response);
    toast.update(toastId, { render: 'Transaction Successful', type: 'success', autoClose: 5000 });

  })
  .catch((error) => {
    console.log(error);
    toast.error('Upload Failed');
  });

    setLoggedIn(true)
 
    setTimeout(() => {
        window.location.reload(true);
    },6000);

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
    <div className="div">
      <ToastContainer />
      <Navbar/>
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
    </div>
  )
}

export default SignIn