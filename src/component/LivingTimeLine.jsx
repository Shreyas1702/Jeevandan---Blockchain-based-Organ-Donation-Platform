import axios from "axios";
import React, { useState } from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import MultiForm from "./MultiForm"
import {toast , ToastContainer} from "react-toastify"
function LivingTimeLine({dhosp , rhosp , account , state , tdata , full_data}) {

console.log(tdata)

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
  }else if(tdata.stage == 1){
    console.log("First")
    return (
        <div>
          <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Donor Transplant Surgery Ended :- &nbsp;</h1>
          <button type="submit" className="orgrecbtn" onClick={(event) => end_donor_trans_sur(event)}>Donor Transplant Surgery</button>
        </div>    
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
  }else if(tdata.stage == 2){
    console.log("First")
    return (
        <div>
          <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Reciever Transplant Surgery Started :- &nbsp;</h1>
          <button type="submit" className="orgrecbtn" onClick={(event) => start_reciever_trans_sur(event)}>Reciever Transplant Surgery</button>
        </div>    
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
  }else if(tdata.stage == 3){
    console.log("First")
    return (
        <div>
          <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Reciever Transplant Surgery Ended :- &nbsp;</h1>
          <button type="submit" className="orgrecbtn" onClick={(event) => end_reciever_trans_sur(event)}>Donor Transplant Surgery</button>
        </div>    
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
    console.log(full_data)
    if(tdata.stage < 4){
      return (
          <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
      )    
    }else if(tdata.stage == 4){
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
    else {      
      return (
        <div>
          <h1 style={{marginTop : "20px" , color : "#5ec567"}}>NFT has been Successfully Transfered</h1>
        </div>
      )
    }
  }

  function seventhStage(){
    if(tdata.stage < 5){
      return (
          <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
      )    
    }else{
      return(
        <div>
          <h1 style={{marginTop : "20px" , marginLeft : "15px" , color : "#5ec567"}}>Successfully Completed The Entire Process</h1>
        </div>
      )
    }
  }


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
      console.log(tdata.trans_id)
      const transaction = await contract_living.start_living_donor_surgery(tdata.trans_id);
      console.log(contract_living);
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
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
      const transaction = await contract_living.end_living_donor__surgery(tdata.trans_id);
      console.log(contract_living);
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
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
      const transaction = await contract_living.start_living_receiver_surgery(tdata.trans_id);
      console.log(contract_living);
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
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
      const {contract_living} = state;
      console.log(tdata.trans_id)
      const transaction = await contract_living.end_living_receiver_surgery(tdata.trans_id , "0x28A8508855b055a7Bdb3bC9094320C12f5D282c6");
      console.log(contract_living);
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
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
      const {contract_nft} = state;
      const organ = full_data.organ;
      var nftId = full_data.data.donor_id.nftId[organ]
      console.log(nftId , organ , full_data.data.donor_id.meta_address , full_data.data.reciever_id.meta_address)
    //   console.log(nftId , tdata.donor_id.meta_address , tdata.reciever_id.meta_address)
      const transaction = await contract_nft.transferNFT(full_data.data.donor_id.meta_address , full_data.data.reciever_id.meta_address , nftId  , {gasLimit : "30000000"});
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      await transaction.wait();
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