import axios from "axios";
import React, { useState } from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import MultiForm from "./MultiForm"
import {toast , ToastContainer} from "react-toastify"
function TimeLine({dhosp , rhosp , account , state , tdata}) {

console.log(tdata)

const firstStage = () => {
  const {day , month , year , hours , minutes , seconds} = getTime(tdata.organ_match);
    return (
      <div>
        <h1 style={{marginTop : "20px"}}>Organ Matching Started At :- </h1>
        <p style={{marginTop : "50px"}}>Date: {day}-{month}-{year}</p>
        <p>Task completed at time: {hours}:{minutes}:{seconds}</p>
      </div>
    )
}

const secondStage=()=>{
  console.log(account);
  console.log(tdata);
  if(account==dhosp.meta_address)
  {
    return(
    <MultiForm account={account} state={state} dhosp={dhosp} rhosp={rhosp} tdata={tdata}/>

    )
  }
  else{
    return (
      <p style={{marginTop : "40px" , color : "#5ec567"}}>The Process is Still Going on.</p>
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
    if(account==rhosp.meta_address)
    {
      return (
        <div>
          <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Organ Recieved :- &nbsp;</h1>
          <button type="submit" className="orgrecbtn" onClick={(event) => orgrec(event)}>Organ Recieved Successfully</button>
        </div>
      )
    }
    else{
      return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>The Process is Still Going on.</p>
    )
    }
   
  }
  else{

    const {day , month , year , hours , minutes , seconds} = getTime(tdata.t_s_start);

    return (
      <div>
        <h1 style={{marginTop : "20px"}}>Organ Recieved At :- </h1>
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
    if(account==rhosp.meta_address)
    {
      return(
        <div>
          <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Transplant Surgery Started :- &nbsp;</h1>
          <button type="submit" className="orgrecbtn" onClick={(event) => transsur(event)}>Transplant Surgery Started</button>
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
    
    const {day , month , year , hours , minutes , seconds} = getTime(tdata.t_s_start);
    return (
      <div>
        <h1 style={{marginTop : "20px"}}>Transplant Surgery Started At :- </h1>
        <p style={{marginTop : "50px"}}>Date: {day}-{month}-{year}</p>
        <p>Task completed at time: {hours}:{minutes}:{seconds}</p>
      </div>
    )

  }
}

const fiftStage = () => {

  if(tdata.stage < 4){
    console.log("First")
    return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
    )    
  }else if(tdata.stage == 4){
    if(account==rhosp.meta_address)
    {
      return(
        <div>
          <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Transplant Surgery Ended :- &nbsp;</h1>
            <button type="submit" className="orgrecbtn" onClick={(event) => surend(event)}>Transplant Surgery Ended Successfully</button>
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
    
    const {day , month , year , hours , minutes , seconds} = getTime(tdata.t_s_end);
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
    if(tdata.stage < 5){
      return (
          <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
      )    
    }else if(tdata.stage == 5){
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
  const dateTimeString = date;
  const dateTime = new Date(dateTimeString);

  const year = dateTime.getUTCFullYear();
  const month = dateTime.getUTCMonth() + 1; // Month is zero-based, so add 1
  const day = dateTime.getUTCDate();

  // Extract time components
  const hours = dateTime.getUTCHours();
  const minutes = dateTime.getUTCMinutes();
  const seconds = dateTime.getUTCSeconds();

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

  const stage = 0;

  async function orgrec(event){
    try{
      event.preventDefault();
      const {contract_nft} = state;
      const transaction = await contract_nft.end_transport(tdata.transplant_id);
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      await transaction.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
      console.log(transaction)
      await axios.post(`http://localhost:8000/org_rec/${tdata.transplant_id}`).then((response) => {
      console.log(response)  
      if(response.data.success == true){
        console.log("thirdStage");
        window.location.reload(true);
      }
      });
    }
    catch(error){
      toast.error("Something went wrong");
    }
  }

  async function transsur(event){
    try{
      event.preventDefault();
      const {contract_nft} = state;
      const transaction = await contract_nft.start_surgery(tdata.transplant_id);
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      await transaction.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
      console.log(transaction)
      axios.post(`http://localhost:8000/trans_sur/${tdata.transplant_id}`).then((response) => {
      console.log(response)  
      if(response.data.success == true){
        console.log("thirdStage");
        window.location.reload(true);
      }
      });
    }
    catch(error){
      toast.error("Something went wrong");
    }
  }

    async function surend(event){
    try{
      event.preventDefault();
      const {contract_nft} = state;
      const transaction = await contract_nft.end_surgery(tdata.transplant_id , "0x28A8508855b055a7Bdb3bC9094320C12f5D282c6");
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      await transaction.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
      console.log(transaction)
      axios.post(`http://localhost:8000/sur_end/${tdata.transplant_id}`).then((response) => {
      console.log(response)  
      if(response.data.success == true){
        console.log("thirdStage");
        window.location.reload(true);
      }
      });
    }
    catch(error){
      toast.error("Something went wrong");
    }
  }

    async function tranNFT(event){
    try{
      event.preventDefault();
      const {contract_nft} = state;
      const organ = tdata.organ;
      var nftId = tdata.donor_id.nftId[organ]
      console.log(nftId , tdata.donor_id.meta_address , tdata.reciever_id.meta_address)
      const transaction = await contract_nft.transferNFT(tdata.donor_id.meta_address , tdata.reciever_id.meta_address , nftId );
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      await transaction.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
      await axios.post(`http://localhost:8000/transNFT/${tdata.transplant_id}`).then((response) => {
      console.log(response)  
      if(response.data.success == true){
        console.log(response);
      }
      console.log(transaction)
      });
    }
    catch(error){
      console.log(error);
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
        <FormWizard.TabContent title="Organ Matching And Searching" icon="ti-user">
          {firstStage()}
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Start Transportation" icon="ti-settings">
          {secondStage()}
        </FormWizard.TabContent>
        <FormWizard.TabContent title="End Transportation" icon="ti-check">
          {thirdStage()}
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Start Transplant Surgery" icon="ti-check">
          {fourthStage()}
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Transplant Surgery Ended" icon="ti-check">
          {fiftStage()}
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Transfer NFT" icon="ti-check">
          {sixthStage()}
        </FormWizard.TabContent>
          {seventhStage()}
      </FormWizard>
    </>
  )
}
 
export default TimeLine;