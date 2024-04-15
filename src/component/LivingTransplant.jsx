import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom';
import TimeLine from './TimeLine'
import axios from 'axios';
import Navbar from './Navbar'
import Donor_Reciever_data from './Donor_Reciever_data';
import LivingTimeLine from './LivingTimeLine';
import Modal from './Modals';
const LivingTransplant = ({account , state}) => {

    const [open, setOpen] = React.useState(false);
 
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
    console.log(true)
        setOpen(true);
    };

    const location = useLocation();

    const full_data = location.state.data;


    var [tranData , setTransData] = React.useState(null);
    var [dhosp , setdhosp] = React.useState(null);
    var [rhosp , setrhosp] = React.useState(null);
    var [datas , setdatas] = React.useState(null)
    const [loading , setloading] = React.useState(true);


    React.useEffect(() => {
        const {contract_living} = state;

        var res;
        
        setTimeout(async () => {
            res = await getData();
            setloading(false);
        }, 1000);

        if(contract_living != undefined && tranData){
            getTimeLine();
        }

    },[state , tranData]);

    if(loading){
        return <div></div>;
    }

    async function getTimeLine(){
        const {contract_living} = state;

        const full_data = location.state.data;

        var stage = await contract_living.getlivingtransdetails(full_data.trans_id);

        var ddata = await contract_living.getlivingtranstimeline(full_data.trans_id);
        
        console.log(ddata);

        console.log(stage);


        var json = {
            first : parseInt(ddata[0]),
            second : parseInt(ddata[1]),
            third : parseInt(ddata[2]),
            fourth : parseInt(ddata[3]),
            stage : parseInt(stage[4]),
            trans_id : parseInt(full_data.trans_id),
            success : parseInt(stage[5]),
        }

        tranData["organ"] = stage[3];
        tranData["transplant_id"] = json.trans_id;
        console.log(tranData);
        setdatas(json);

    }

    async function getData(){
        try{

            const tId = location.state.tId;

            const full_data = location.state.data;

            setdhosp(full_data.data.hosp)

            setrhosp(full_data.data.hosp)
            
            setTransData(full_data.data);
        }
        catch(e){
            console.log(e);
        }
    }

function ModalFunc() {
        if(open){
        return (
            <Modal setOpen={setOpen} state={state} tdata={tranData}/>
        )
        }
    }

    const overlayStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: '0',
    };


  return (
    <div>
        <Navbar/>
        {datas ? <Donor_Reciever_data tranData={tranData} dhosp={dhosp} rhosp={rhosp} /> : <></>}
        <div>
            <LivingTimeLine account={account} state={state} dhosp={dhosp} rhosp={rhosp} tdata={datas} full_data={full_data} />
        </div>
        <div style={{display : "flex" , justifyContent : "center"}}>
        <button type="submit" onClick={handleOpen} style={{padding : "15px 100px" , backgroundColor : "#5ec567"  , color : "white" , borderRadius : "5px" , fontSize : "20px"}}>Failed</button>
      </div>
      {ModalFunc()}

      {open && <div style={overlayStyle}></div>}
    </div>
  )
}

export default LivingTransplant