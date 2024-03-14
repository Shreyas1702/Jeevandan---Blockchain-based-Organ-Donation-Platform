import axios from "axios";
import React, { useState } from "react";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import MultiForm from "./MultiForm"
function TimeLine({dhosp , rhosp , account , state , tdata}) {

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

const thirdStage = () => {
  console.log(tdata.stage)
  if(tdata.stage < 2){
    console.log("First")
    return (
        <p style={{marginTop : "40px" , color : "#5ec567"}}>Please Complete the Previous Step</p>
    )
  }else if(tdata.stage == 2){
      console.log("second")

    return (
      <div>
        <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Organ Recieved :- &nbsp;</h1>
        <button type="submit" className="orgrecbtn" onClick={(event) => orgrec(event)}>Organ Recieved Successfully</button>
      </div>
    )
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
    return(
      <div>
        <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Transplant Surgery Started :- &nbsp;</h1>
        <button type="submit" className="orgrecbtn" onClick={(event) => transsur(event)}>Transplant Surgery Started</button>
      </div>
    )
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
    return(
      <div>
        <h1 style={{marginTop : "20px" , marginLeft : "15px"}}>Transplant Surgery Ended :- &nbsp;</h1>
          <button type="submit" className="orgrecbtn" onClick={(event) => surend(event)}>Transplant Surgery Ended Successfully</button>
      </div>
    )
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
    event.preventDefault();
    const {contract_nft} = state;
    const transaction = await contract_nft.end_transport(tdata.transplant_id);
    console.log(transaction)
    await axios.post(`http://localhost:8000/org_rec/${tdata.transplant_id}`).then((response) => {
    console.log(response)  
    if(response.data.success == true){
      console.log("thirdStage");
      window.location.reload(true);
    }
    });
  }

  async function transsur(event){
    event.preventDefault();
    const {contract_nft} = state;
    const transaction = await contract_nft.start_surgery(tdata.transplant_id);
    console.log(transaction)
    axios.post(`http://localhost:8000/trans_sur/${tdata.transplant_id}`).then((response) => {
    console.log(response)  
    if(response.data.success == true){
      console.log("thirdStage");
      window.location.reload(true);
    }
    });
  }

    async function surend(event){
    event.preventDefault();
    const {contract_nft} = state;
    const transaction = await contract_nft.end_surgery(tdata.transplant_id);
    console.log(transaction)
    axios.post(`http://localhost:8000/sur_end/${tdata.transplant_id}`).then((response) => {
    console.log(response)  
    if(response.data.success == true){
      console.log("thirdStage");
      window.location.reload(true);
    }
    });
  }

  function sixthStage(){
    if(tdata.stage == 5){
    return (
      <p style={{marginTop : "40px" , color : "#5ec567"}}>The Transplantation Procees has been Successfully Completed</p>
    )
    }
    else{
    }
  }

  return (
    <>
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
          <MultiForm account={account} state={state} dhosp={dhosp} rhosp={rhosp} tdata={tdata}/>
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
          {sixthStage()}
      </FormWizard>
    </>
  )
}
 
export default TimeLine;