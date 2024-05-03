import axios from "axios";
import React, { useState } from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import MultiForm from "./MultiForm"
import {toast , ToastContainer} from "react-toastify"
import { ethers } from "ethers";
function LivingTimeLine({dhosp , rhosp , account , state , tdata , full_data}) {

if(tdata == null){
    return (
        <div>Loading</div>
    )
}

const firstStage = () => {
  if(tdata.stage < 1){
    console.log("First")
    return (
        <div>
          <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Donor Transplant Surgery Started :- &nbsp;</h1>
          <button type="submit" className="orgrecbtn" onClick={(event) => start_donor_trans_sur(event)}>Donor Transplant Surgery</button>
        </div>    )    
  }
  else if(tdata.success == 2 && tdata.stage < 1){
    return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Sorry the Process Has Failed</p>
      ) 
  }
  else {
    const {day , month , year , hours , minutes , seconds} = getTime(tdata.first);
    return (
      <div>
        <h1 style={{marginTop : "20px"}}>Transplant Surgery Started At :- </h1>
        <p style={{marginTop : "50px"}}>Date: {day}-{month}-{year}</p>
        <p>Task completed at time: {hours}:{minutes}:{seconds}</p>
      </div>
    )

  }
}

const secondStage=()=>{
  if(tdata.stage < 1){
    console.log("First")
    return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
    )
  }else if(tdata.stage == 1 && tdata.success != 2){
    console.log("First")
    return (
        <div>
          <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Donor Transplant Surgery Ended :- &nbsp;</h1>
          <button type="submit" className="orgrecbtn" onClick={(event) => end_donor_trans_sur(event)}>Donor Transplant Surgery</button>
        </div>    
    )    
  }
  else if(tdata.success == 2 && tdata.stage <= 1){
    return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Sorry the Process Has Failed</p>
      ) 
  }
  else {
    const {day , month , year , hours , minutes , seconds} = getTime(tdata.second);
    return (
      <div>
        <h1 style={{marginTop : "20px"}}>Transplant Surgery Ended At :- </h1>
        <p style={{marginTop : "50px"}}>Date: {day}-{month}-{year}</p>
        <p>Task completed at time: {hours}:{minutes}:{seconds}</p>
      </div>
    )

  }
}
const thirdStage = () => {
  console.log(tdata.stage)
  if(tdata.stage < 2){
    console.log("First")
    return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
    )
  }else if(tdata.stage == 2 && tdata.success != 2){
    console.log("First")
    return (
        <div>
          <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Reciever Transplant Surgery Started :- &nbsp;</h1>
          <button type="submit" className="orgrecbtn" onClick={(event) => start_reciever_trans_sur(event)}>Reciever Transplant Surgery</button>
        </div>    
    )    
  }
  else if(tdata.success == 2 && tdata.stage <= 2){
    return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Sorry the Process Has Failed</p>
      ) 
  }
  else {
    const {day , month , year , hours , minutes , seconds} = getTime(tdata.third);
    return (
      <div>
        <h1 style={{marginTop : "20px"}}>Transplant Surgery Started At :- </h1>
        <p style={{marginTop : "50px"}}>Date: {day}-{month}-{year}</p>
        <p>Task completed at time: {hours}:{minutes}:{seconds}</p>
      </div>
    )

  }
}

const fourthStage = () => {

  if(tdata.stage < 3){
    console.log("First")
    return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
    )    
  }else if(tdata.stage == 3 && tdata.success != 2){
    console.log("First")
    return (
        <div>
          <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Reciever Transplant Surgery Ended :- &nbsp;</h1>
          <button type="submit" className="orgrecbtn" onClick={(event) => end_reciever_trans_sur(event)}>Donor Transplant Surgery</button>
        </div>    
    )    
  }
  else if(tdata.success == 2 && tdata.stage <= 3){
    return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Sorry the Process Has Failed</p>
      ) 
  }
  else {
    const {day , month , year , hours , minutes , seconds} = getTime(tdata.fourth);
    return (
      <div>
        <h1 style={{marginTop : "20px"}}>Transplant Surgery Ended At :- </h1>
        <p style={{marginTop : "50px"}}>Date: {day}-{month}-{year}</p>
        <p>Task completed at time: {hours}:{minutes}:{seconds}</p>
      </div>
    )

  }
}

function sixthStage(){
    console.log(tdata)
    if(tdata.stage < 4){
      return (
          <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
      )    
    }else if(tdata.stage == 4 && tdata.success != 2){
      if(account==rhosp.meta_address)
      {
        return(
          <div>
            <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Transfer the Organ NFT :- &nbsp;</h1>
              <button type="submit" className="orgrecbtn" onClick={(event) => tranNFT(event)}>Transfer NFT</button>
          </div>
        )
      }
      else{
        return (
          <p style={{marginTop : "40px" , color : "#5ec567"}}>The Process is Still Going on.</p>
      )
      }
    }
    else if(tdata.success == 2 && tdata.stage <= 4){
        return (
            <p style={{marginTop : "40px" , color : "#5ec567"}}>Sorry the Process Has Failed</p>
          ) 
    }
    else {      
      return (
        <div>
          <h1 style={{marginTop : "20px" , color : "#5ec567"}}>Successfully Completed The Entire Process</h1>
        </div>
      )
    }
  }

  // function seventhStage(){
  //   if(tdata.stage < 5){
  //     return (
  //         <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
  //     )    
  //   }else{
  //     return(
  //       <div>
  //         <h1 style={{marginTop : "20px" , marginLeft : "15px" , color : "#5ec567"}}>Successfully Completed The Entire Process</h1>
  //       </div>
  //     )
  //   }
  // }


function getTime(date){
    var milliseconds = date * 1000;

    var date = new Date(milliseconds);

    // Extracting date components
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because January is 0
    var day = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);

    // Formatted date string
    var formattedDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;


    return {
    day,
    month,
    year,
    hours,
    minutes,
    seconds
    }
}

const handleComplete = () => {
    console.log("Form completed!");
    // Handle form completion logic here
  };
 const tabChanged = ({
    prevIndex,
    nextIndex,
  }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
    
    if(nextIndex == 3 || prevIndex == 3){
      thirdStage()
    }
  };

  async function start_donor_trans_sur(event){
    try{
      console.log("Hello");
      event.preventDefault();
      const {contract_living} = state;
      console.log(tdata);
      console.log(tdata.trans_id)
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      const transaction = await contract_living.start_living_donor_surgery(tdata.trans_id);
      console.log(contract_living);
      await transaction.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
    
      setTimeout(() => {
        console.log("thirdStage");
        window.location.reload(true);
      } , 6000)
    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function end_donor_trans_sur(event){
    try{
      console.log("Hello");
      event.preventDefault();
      const {contract_living} = state;
      console.log(tdata.trans_id)
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      const transaction = await contract_living.end_living_donor__surgery(tdata.trans_id);
      console.log(contract_living);
      await transaction.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
    
      setTimeout(() => {
        console.log("secondStage");
        window.location.reload(true);
      } , 6000)
    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }
  }

    async function start_reciever_trans_sur(event){
    try{
      console.log("Hello");
      event.preventDefault();
      const {contract_living} = state;
      console.log(tdata.trans_id)
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      const transaction = await contract_living.start_living_receiver_surgery(tdata.trans_id);
      console.log(contract_living);
      await transaction.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
    
      setTimeout(() => {
        console.log("secondStage");
        window.location.reload(true);
      } , 6000)
    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  async function end_reciever_trans_sur(event){
    try{
      console.log("Hello");
      event.preventDefault();
      const {contract_living , sign} = state;
      console.log(tdata.trans_id)
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      const transaction = await contract_living.end_living_receiver_surgery(tdata.trans_id , sign);
      console.log(contract_living);
      await transaction.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
    
      setTimeout(() => {
        console.log("secondStage");
        window.location.reload(true);
      } , 6000)
    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }
  }

    async function tranNFT(event){
    try{
      event.preventDefault();
      const {account} = state;
      // var full_data = JSON.parse(full_data);
      console.log(full_data.data)
      const {contract_living,contract_nft , provider} = state;
      const organ = full_data.data.organ;
      var nftId = full_data.data.data.donor_id.nftId[organ]
      console.log(nftId , organ , full_data.data.data.donor_id.meta_address , full_data.data.data.reciever_id.meta_address)
    //   console.log(nftId , tdata.donor_id.meta_address , tdata.reciever_id.meta_address)
    console.log(contract_nft);  
    //  const gasEstimate = await contract_nft.estimateGas.transferNFT(
    //   full_data.data.data.donor_id.meta_address,
    //   full_data.data.data.reciever_id.meta_address,
    //   nftId
    // ).catch((err) => {
    //   console.error("Error estimating gas:", err);
    //   throw err;
    // });

    // // Add a buffer to the estimated gas value
    // const gasLimit = gasEstimate.mul(12).div(10);
    // console.log("Gas limit:", gasLimit.toString());
    const gasPrice = await provider.getFeeData()
// { BigNumber: "23238878592" }
      console.log(gasPrice.gasPrice)
      const gasPriceInWei = parseInt(gasPrice.gasPrice);
      console.log(gasPriceInWei)
// ...often this gas price is easier to understand or
// display to the user in gwei
    // utils.formatUnits(gasPrice, "gwei")
      const transaction = await contract_nft.transferNFT(full_data.data.data.donor_id.meta_address , full_data.data.data.reciever_id.meta_address , nftId );
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      await transaction.wait();
      const trans = await contract_living.TransNFT(tdata.trans_id);
      await trans.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
      setTimeout(() => {
        console.log("secondStage");
        window.location.reload(true);
      } , 6000)
    }
    catch(error){
      console.log(error)
      toast.error("Something Went Wrong");
    }
  }

  return (
    <>
      <ToastContainer/>
      <FormWizard
        shape="circle"
        color="#5ec576"
        onComplete={handleComplete}
        onTabChange={tabChanged}
        startIndex = {tdata.stage}
      >
        <FormWizard.TabContent title="Donor Transaplant Surgery Started" icon="ti-user">
          {firstStage()}
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Donor Transaplant Surgery Ended" icon="ti-settings">
          {secondStage()}
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Reciever Transaplant Surgery Started" icon="ti-check">
          {thirdStage()}
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Reciever Transaplant Surgery Ended" icon="ti-check">
          {fourthStage()}
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Transfer NFT" icon="ti-check">
          {sixthStage()}
        </FormWizard.TabContent>
      </FormWizard>
    </>
  )
}
 
export default LivingTimeLine;