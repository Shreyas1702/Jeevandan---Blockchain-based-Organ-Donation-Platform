import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { json, useLocation } from 'react-router-dom';
import TimeLine from './TimeLine'
import axios from 'axios';
import Navbar from './Navbar'
import Donor_Reciever_data from './Donor_Reciever_data';
import Modal from './Modal';

const Transplant = ({account , state}) => {
    const [open, setOpen] = React.useState(false);
 
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
    console.log(true)
        setOpen(true);
    };

    const location = useLocation();

    var [tranData , setTransData] = React.useState(null);
    var [dhosp , setdhosp] = React.useState(null);
    var [rhosp , setrhosp] = React.useState(null);
    var [contarctData , setcontractData] = React.useState(null);
    var [organ , setOrgan] = React.useState("");
    const [loading , setloading] = React.useState(true);

    const {contract , nft} = state;



    React.useEffect(() => {
        
        setTimeout(async () => {
            const res = await getData();
            setTransData(res.d);
            setdhosp(res.DonorHosp)
            setrhosp(res.RecHosp)
            setloading(false);
        }, 1000);

        console.log(contract)

        if(contract != null){
            setTimeout(async () => {
                const jsonData = await getContractData();
                console.log(jsonData);
                setcontractData(jsonData);
            },1000)
        }
    },[contract]);

    console.log(contarctData);

    async function getContractData(){
        const tId = location.state.tId;

        const transtime = await contract.getTransTime(tId , nft);

        const transDet = await contract.getTransDet(tId , nft);

        const driverDet = await contract.getDriverDet(tId , nft);

        var json;

        for(var i = 0 ; i < transtime.length ; i++){
            console.log(transtime[0])
            const match = parseInt(transtime[0]);
            const trans_start = parseInt(transtime[1]);
            const organ_rec = parseInt(transtime[2]);
            const start_sur = parseInt(transtime[3]);
            const end_sur = parseInt(transtime[4]);

            var json = {
                match,
                trans_start,
                organ_rec,
                start_sur,
                end_sur
            }


        }

        
        for(var i = 0 ; i < transDet.length ; i++){
            const d_id = parseInt(transDet[0]);
            const r_id = parseInt(transDet[1]);
            const stage = parseInt(transDet[5]);
            const success = parseInt(transDet[6]);

            var json1 = {
                d_id,
                r_id,
                stage,
                success
            }

            json["detail"] = json1
        }

        for(var i = 0 ; i < driverDet.length ; i++){
            const contact = parseInt(driverDet[2]);
            const name = driverDet[0];
            const plate_num = driverDet[1];

            var json2 = {
                name,
                plate_num,
                contact
            }

            json["driver"] = json2;
        }

        return json;

    }

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

            setOrgan(ddata.d.organ);

            return ddata
        }
        catch(e){
            console.log(e);
        }
    }

    console.log(tranData);
    console.log("DHosp : " , dhosp);
    console.log("RHosp" , rhosp);

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
        <Donor_Reciever_data tranData={tranData} organ={organ} dhosp={dhosp} rhosp={rhosp} />
        <div>
            <TimeLine account={account} state={state} dhosp={dhosp} rhosp={rhosp} tdata={tranData} cData={contarctData}/>
        </div>
        <div style={{display : "flex" , justifyContent : "center"}}>
        <button type="submit" onClick={handleOpen} style={{padding : "15px 100px" , backgroundColor : "#5ec567"  , color : "white" , borderRadius : "5px" , fontSize : "20px"}}>Failed</button>
      </div>
      {ModalFunc()}

      {open && <div style={overlayStyle}></div>}

    </div>
  )
}

export default Transplant