import axios from "axios";
import React, { useState } from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import MultiForm from "./MultiForm"
import {toast , ToastContainer} from "react-toastify"

function TimeLine({dhosp , rhosp , account , state , tdata , cData}) {

console.log(tdata)

const firstStage = () => {
  if(cData != null){
    const {day , month , year , hours , minutes , seconds} = getTime(cData.match);
      return (
        <div>
          <h1 style={{marginTop : "20px"}}>Organ Matching Started At :- </h1>
          <p style={{marginTop : "50px"}}>Date: {day}-{month}-{year}</p>
          <p>Task completed at time: {hours}:{minutes}:{seconds}</p>
        </div>
    )
  }
}

const secondStage=()=>{
  console.log(account);
  console.log(tdata);
  if(account==dhosp.meta_address && tdata.success != "Failed")
  {
    return(
    <MultiForm account={account} state={state} dhosp={dhosp} rhosp={rhosp} tdata={tdata}  cData = {cData}/>

    )
  }
  else if(tdata.stage == 1 && tdata.success != "Failed"){
    return (
      <p style={{marginTop : "40px" , color : "#5ec567"}}>The Process is Still Going on.</p>
  )
  }
  else if(tdata.success == "Failed" && tdata.stage <= 1){
      return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Sorry the Process Has Failed</p>
    ) 
  }
  else{
    return(
    <MultiForm account={account} state={state} dhosp={dhosp} rhosp={rhosp} tdata={tdata}/>

    )
  }
}
const thirdStage = () => {
  console.log(tdata.stage)
  if(tdata.stage < 2 && tdata.success != "Failed"){
    console.log("First")
    return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
    )
  }else if(tdata.stage == 2 && tdata.success != "Failed"){
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
  else if(tdata.success == "Failed" && tdata.stage <= 2){
      return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Sorry the Process Has Failed</p>
    ) 
  }
  else{

    if(cData != null){
      const {day , month , year , hours , minutes , seconds} = getTime(cData.organ_rec);

      return (
        <div>
          <h1 style={{marginTop : "20px"}}>Organ Recieved At :- </h1>
          <p style={{marginTop : "50px"}}>Date: {day}-{month}-{year}</p>
          <p>Task completed at time: {hours}:{minutes}:{seconds}</p>
        </div>
      )
    }
  }
}

const fourthStage = () => {

  if(tdata.stage < 3 && tdata.success != "Failed"){
    console.log("First")
    return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
    )    
  }else if(tdata.stage == 3 && tdata.success != "Failed"){
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
    else if(tdata.success == "Failed" && tdata.stage <= 3){
      return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Sorry the Process Has Failed</p>
    ) 
  }
  else {
    
    if(cData != null){
      const {day , month , year , hours , minutes , seconds} = getTime(cData.start_sur);
      return (
        <div>
          <h1 style={{marginTop : "20px"}}>Transplant Surgery Started At :- </h1>
          <p style={{marginTop : "50px"}}>Date: {day}-{month}-{year}</p>
          <p>Task completed at time: {hours}:{minutes}:{seconds}</p>
        </div>
      )
    }

  }
}

const fiftStage = () => {

  if(tdata.stage < 4 && tdata.success != "Failed"){
    console.log("First")
    return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
    )    
  }else if(tdata.stage == 4 && tdata.success != "Failed"){
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
    else if(tdata.success == "Failed" && tdata.stage <= 4){
      return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Sorry the Process Has Failed</p>
    ) 
  }
  else {
    if(cData != null){
      const {day , month , year , hours , minutes , seconds} = getTime(cData.end_sur);
      return (
        <div>
          <h1 style={{marginTop : "20px"}}>Transplant Surgery Ended At :- </h1>
          <p style={{marginTop : "50px"}}>Date: {day}-{month}-{year}</p>
          <p>Task completed at time: {hours}:{minutes}:{seconds}</p>
        </div>
      )
    }

  }
}

function sixthStage(){
    if(tdata.stage < 5 && tdata.success != "Failed"){
      return (
          <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
      )    
    }else if(tdata.stage == 5 && tdata.success != "Failed"){
      if(account)
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
    else if(tdata.success == "Failed" && tdata.stage <= 5){
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

  function seventhStage(){
    if(tdata.stage < 5 && tdata.success != "Failed"){
      return (
          <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
      )    
    }
    else if(tdata.success == "Failed" && tdata.stage <= 6){
      return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Sorry the Process Has Failed</p>
      ) 
    }
    else{
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

  const stage = 0;

  async function orgrec(event){
    try{
      event.preventDefault();
      const {contract_nft , sign} = state;
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      const transaction = await contract_nft.end_transport(tdata.transplant_id , sign);
      await transaction.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
      console.log(transaction)
      await axios.post(`http://localhost:8000/org_rec/${tdata.transplant_id}`).then((response) => {
      console.log(response)  
      if(response.data.success == true){
        console.log("thirdStage");
        setTimeout(() => {
          window.location.reload(true);
        },5000);
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
      const {contract_nft , sign} = state;
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      const transaction = await contract_nft.start_surgery(tdata.transplant_id , sign);
      await transaction.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
      console.log(transaction)
      axios.post(`http://localhost:8000/trans_sur/${tdata.transplant_id}`).then((response) => {
      console.log(response)  
      if(response.data.success == true){
        console.log("thirdStage");
        setTimeout(() => {
          window.location.reload(true);
        },5000);
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
      const {contract_nft , sign} = state;
      console.log(sign);
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      const transaction = await contract_nft.end_surgery(tdata.transplant_id , sign);
      await transaction.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
      console.log(transaction)
      axios.post(`http://localhost:8000/sur_end/${tdata.transplant_id}`).then((response) => {
      console.log(response)  
      if(response.data.success == true){
        console.log("thirdStage");
        setTimeout(() => {
          window.location.reload(true);
        },5000);
      }
      });
    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }
  }

    async function tranNFT(event){
    try{
      event.preventDefault();
      const {contract_nft , provider} = state;
      const organ = tdata.organ;
      var nftId = tdata.donor_id.nftId[organ]
      console.log(nftId , tdata.donor_id.meta_address , tdata.reciever_id.meta_address)
      const gasPrice = await provider.getFeeData()
      console.log(gasPrice.gasPrice)
      const gasPriceInWei = parseInt(gasPrice.gasPrice);
      console.log(gasPriceInWei)
      const toastId = toast.info('Transaction in Progress', { autoClose: false });
      const transaction = await contract_nft.transferNFT(tdata.donor_id.meta_address , tdata.reciever_id.meta_address , nftId);
      await transaction.wait();
      toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
      const toastIds = toast.info('Transaction in Progress', { autoClose: false });
      const trans = await contract_nft.transferedNFT(tdata.transplant_id);
      await trans.wait();
      toast.update(toastIds, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
      await axios.post(`http://localhost:8000/transNFT/${tdata.transplant_id}`).then((response) => {
      console.log(response)  
      if(response.data.success == true){
        console.log("thirdStage");
        setTimeout(() => {
          window.location.reload(true);
        },5000);
      }
      console.log(transaction)
      });
    }
    catch(error){
      console.log(error);
      toast.error("Something Went Wrong");
    }
  }

  const failedTrans = async (req,res) => {
    const {contract} = state;

    const transaction = await contract.failedTrans(tdata.transplant_id)
  }

  const TimeLine = (req,res) => {
    if(dhosp.meta_address == rhosp.meta_address){
      return (
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
        {/* <FormWizard.TabContent title="Start Transportation" icon="ti-settings">
          {secondStage()}
        </FormWizard.TabContent>
        <FormWizard.TabContent title="End Transportation" icon="ti-check">
          {thirdStage()}
        </FormWizard.TabContent> */}
        
        <FormWizard.TabContent title="Start Transplant Surgery" icon="ti-check">
          {fourthStage()}
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Transplant Surgery Ended" icon="ti-check">
          {fiftStage()}
        </FormWizard.TabContent>
        <FormWizard.TabContent title="Transfer NFT" icon="ti-check">
          {sixthStage()}
        </FormWizard.TabContent>
      </FormWizard>
      )
    }
    else{
      return (
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
      </FormWizard>
      )
    }
  }

  return (
    <div>
      <ToastContainer/>
      {TimeLine()}
    </div>
  )
}
 
export default TimeLine;