import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom';
import TimeLine from './TimeLine'
import axios from 'axios';
import Navbar from './Navbar'
import Donor_Reciever_data from './Donor_Reciever_data';
const Transplant = ({account , state}) => {

    const location = useLocation();

    var [tranData , setTransData] = React.useState(null);
    var [dhosp , setdhosp] = React.useState(null);
    var [rhosp , setrhosp] = React.useState(null);
    const [loading , setloading] = React.useState(true);


    React.useEffect(() => {
        setTimeout(async () => {
            const res = await getData();
            console.log(res);
            setTransData(res.d);
            setdhosp(res.DonorHosp)
            setrhosp(res.RecHosp)
            setloading(false);
        }, 1000);
    },[]);

    if(loading){
        return <div></div>;
    }

    async function getData(){
        try{

            const tId = location.state.tId;

            console.log(tId)

            var ddata;

            await axios.post("http://localhost:8000/trans_detail" ,{ data : tId}).then((response) => {
                ddata = (response.data.data)
                // setTransData(response.data.data.d);
                // setdhosp(response.data.data.DonorHosp)
                // setrhosp(response.data.data.RecHosp)
                // console.log("Data" , tranData);
            })

            console.log(ddata);

            return ddata
        }
        catch(e){
            console.log(e);
        }
    }

    console.log(tranData);
    console.log("DHosp : " , dhosp);
    console.log("RHosp" , rhosp);


  return (
    <div>
        <Navbar/>
        <Donor_Reciever_data tranData={tranData} dhosp={dhosp} rhosp={rhosp} />
        <div>
            <TimeLine account={account} state={state} dhosp={dhosp} rhosp={rhosp} tdata={tranData}/>
        </div>
    </div>
  )
}

export default Transplant