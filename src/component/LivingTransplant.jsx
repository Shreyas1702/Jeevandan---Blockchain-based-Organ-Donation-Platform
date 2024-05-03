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

    const full_data = JSON.parse(location.state.data);


    var [tranData , setTransData] = React.useState(null);
    var [dhosp , setdhosp] = React.useState(null);
    var [rhosp , setrhosp] = React.useState(null);
    var [datas , setdatas] = React.useState(null)
    var [organ , setOrgan] = React.useState("");
    const [loading , setloading] = React.useState(true);


    React.useEffect(() => {
        const {contract_living} = state;

        var res;
        
        setTimeout(async () => {
            res = await getData();
            setloading(false);
        });

        if(contract_living != undefined){
            getTimeLine();
        }

    },[state]);

    if(loading){
        return <div></div>;
    }

    async function getTimeLine(){
        const {contract_living} = state;

        const full_data = JSON.parse(location.state.data);

        console.log(full_data.data)

        var stage = await contract_living.getlivingtransdetails(full_data.data.trans_id);

        var ddata = await contract_living.getlivingtranstimeline(full_data.data.trans_id);
        
        console.log(ddata);

        console.log(stage);


        var json = {
            first : parseInt(ddata[0]),
            second : parseInt(ddata[1]),
            third : parseInt(ddata[2]),
            fourth : parseInt(ddata[3]),
            stage : parseInt(stage[4]),
            trans_id : parseInt(full_data.data.trans_id),
            success : parseInt(stage[5]),
        }

        setOrgan(full_data.data.organ);

        console.log(tranData);
        setdatas(json);

    }

    async function getData(){
        try{

            const tId = location.state.tId;

            const full_data = JSON.parse(location.state.data);

            // const hosp = JSON.parse(location.state.hosp);

            // const d_id = JSON.parse(location.state.d_id);

            // const r_id = JSON.parse(location.state.r_id);

            console.log(full_data.data.data.hosp);

            console.log(full_data.data)

            setdhosp(full_data.data.data.hosp)

            setrhosp(full_data.data.data.hosp)
            
            setTransData(full_data.data.data);
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
        {datas ? <Donor_Reciever_data tranData={tranData} organ = {organ} dhosp={dhosp} rhosp={rhosp} /> : <></>}
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