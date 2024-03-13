import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom';
import TimeLine from './TimeLine'
import axios from 'axios';


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
        <div style={{display : "flex" , flexDirection : "row"  , justifyContent : "center" , marginTop : "40px"}}>
            <div class="card mb-5" style={{maxWidth: "800px" , boxShadow: "0 2rem 3rem var(--color-light)" , position : "relative"}}>
                <div class="row g-0">
                    <div class="col-md-5">
                    <img style={{backgroundSize : "cover" , border : "0.5px solid #D1D1D1" , minWidth: "100%" , height: "350px"}} src="https://media.istockphoto.com/id/1288412525/vector/green-ribbon.jpg?s=612x612&w=0&k=20&c=MRCaLH8PDJ2_6O5hwhx1pv-sYcurZAUIAz3D4uRxOzk=" class="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div class="col-md-7 circle">
                        <div class="ag-courses-item_bg"></div>
                        <div class="card-body" style={{marginTop : "30px"}}>
                            <div style={{display : "flex" , flexDirection : "row" , marginBottom : "0"}}>
                                <h2 class="card-title">Donor</h2>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text" style={{marginTop : "3px" , marginBottom : "1rem"}}>{tranData.donor_id.name}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">BloodGroup :- </p>
                                <p class="card-text">&nbsp;&nbsp;{tranData.donor_id.bloodgroup}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">HLA-Type :- </p>
                                <p class="card-text">&nbsp;&nbsp;{tranData.donor_id.hla.toUpperCase()}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">Hospital Name :- </p>
                                <p class="card-text">&nbsp;{dhosp.username}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">Organ :- </p>
                                <p class="card-text">&nbsp;&nbsp;Kidney</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{width : "200px" , marginTop : "150px" , paddingLeft : "70px"}}>
                <i class="fa-solid fa-arrow-right-long fa-5x" style={{color: "#5ec576"}}></i>
            </div>

            <div class="card mb-5" style={{maxWidth: "800px" , boxShadow: "0 2rem 3rem var(--color-light)" , position : "relative"}}>
                <div class="row g-0">
                    <div class="col-md-5">
                    <img style={{backgroundSize : "cover" , border : "0.5px solid #D1D1D1" , minWidth: "100%" , height: "350px"}} src="https://media.istockphoto.com/id/1288412525/vector/green-ribbon.jpg?s=612x612&w=0&k=20&c=MRCaLH8PDJ2_6O5hwhx1pv-sYcurZAUIAz3D4uRxOzk=" class="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div class="col-md-7 circle">
                        <div class="ag-courses-item_bg"></div>
                        <div class="card-body" style={{marginTop : "30px"}}>
                            <div style={{display : "flex" , flexDirection : "row" , marginBottom : "0"}}>
                                <h2 class="card-title">Reciever</h2>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text" style={{marginTop : "3px" , marginBottom : "1rem"}}>{tranData.reciever_id.name}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">BloodGroup :- </p>
                                <p class="card-text">&nbsp;&nbsp;{tranData.reciever_id.bloodgroup}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">HLA-Type :- </p>
                                <p class="card-text">&nbsp;&nbsp;{tranData.reciever_id.hla.toUpperCase()}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">Hospital Name :- </p>
                                <p class="card-text">&nbsp;{rhosp.username}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">Organ :- </p>
                                <p class="card-text">&nbsp;&nbsp;Kidney</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <TimeLine account={account} state={state} dhosp={dhosp} rhosp={rhosp} tdata={tranData}/>
        </div>
    </div>
  )
}

export default Transplant