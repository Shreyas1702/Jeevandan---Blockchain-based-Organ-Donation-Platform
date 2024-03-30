import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom';
import TimeLine from './TimeLine'
import axios from 'axios';
import Navbar from './Navbar'
import Donor_Reciever_data from './Donor_Reciever_data';
import LivingTimeLine from './LivingTimeLine';
const LivingTransplant = ({account , state}) => {

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

        if(contract_living != undefined){
            getTimeLine();
        }

    },[state]);

    if(loading){
        return <div></div>;
    }

    async function getTimeLine(){
        const {contract_living} = state;

        const full_data = location.state.data;

        var stage = await contract_living.getlivingtransdetails(full_data.trans_id);

        var ddata = await contract_living.getlivingtranstimeline(full_data.trans_id);
        
        console.log(ddata[0]);
        var json = {
            first : parseInt(ddata[0]),
            second : parseInt(ddata[1]),
            third : parseInt(ddata[2]),
            fourth : parseInt(ddata[3]),
            stage : parseInt(stage[4]),
            trans_id : parseInt(full_data.trans_id),
        }

        setdatas(json);

    }

    async function getData(){
        try{

            const tId = location.state.tId;

            const full_data = location.state.data;

            console.log(tId)

            console.log(full_data);

            setdhosp(full_data.data.hosp)

            setrhosp(full_data.data.hosp)
            
            setTransData(full_data.data);
        }
        catch(e){
            console.log(e);
        }
    }


  return (
    <div>
        <Navbar/>
        <Donor_Reciever_data tranData={tranData} dhosp={dhosp} rhosp={rhosp} />
        <div>
            <LivingTimeLine account={account} state={state} dhosp={dhosp} rhosp={rhosp} tdata={datas} full_data={full_data} />
        </div>
    </div>
  )
}

export default LivingTransplant