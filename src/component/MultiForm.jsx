import React from 'react'
import axios from 'axios'
import {toast , ToastContainer} from 'react-toastify'

const MultiForm = ({dhosp , rhosp , account , state , tdata , cData}) => {

    const [data , setData] = React.useState({
        name : "",
        contact : Number,
        plate_num : "",
    })

    const [air , setAir] = React.useState(false)

    const [amb , setAmb] = React.useState(false)

    const [stage , steStage] = React.useState(2);

    const [vehicle , setvehicle] = React.useState({
        name : "",
        id : Number,
        plate_num : "",
    });

    if(tdata.stage >= 2){
        if(tdata.type_transport == "Airlift"){
            vehicle.name = tdata.airlift_dd.name;
            vehicle.id = tdata.airlift_dd.id;
            vehicle.plate_num = tdata.airlift_dd.tail_number
        }else{
            vehicle.name = tdata.ambulance_dd.name;
            vehicle.id = tdata.ambulance_dd.id;
            vehicle.plate_num = tdata.ambulance_dd.number_plate
        }
    }

    function clickAmb(event){
        setAmb(true);
        setAir(false);
        setData({
            name : "",
            id : Number,
            plate_num : "",
        });
    }

    function clickAir(event){
        setAmb(false);
        setAir(true);
        setData({
            name : "",
            contact : Number,
            plate_num : "",
        })
    }

    function handleChange(e){
        e.preventDefault();
        const {name  , value} = e.target;
        setData((prevData) => ({
            ...prevData,
            [name] : value
        }))

        console.log(name);
        console.log(value);
    }

    function getData(){
        console.log("CDATA :- " , cData);
        if(cData != null){
            const Date = cData.trans_start;

                const {day , month , year , hours , minutes , seconds} = getTime(Date);
            return (
            <div>
                <p style={{color : "black" , marginTop : "10px"}}>Task completed at time: <span style={{color : "#5ec567"}}>{hours}:{minutes}:{seconds} </span></p>
            </div>
            )
        }
    }

    
    const submitData = async (event) => {
        try{
            const {contract_nft , sign} = state;
            console.log(tdata);
            event.preventDefault();
            const toastId = toast.info('Transaction in Progress', { autoClose: false });
            const transaction = await contract_nft.start_transport(tdata.transplant_id , data.id , data.name , data.plate_num , sign);
            await transaction.wait();
            console.log(transaction);
            toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
            axios.post(`http://localhost:8000/airdetail/${tdata.transplant_id}` , data).then((response) => {
                console.log(response);
            });
            setTimeout(() => {
            window.location.reload(true);
            },5000);
        }
        catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    const submitDatas = async (event) => {
        try{
            const {contract_nft , sign} = state;
            console.log(tdata);
            event.preventDefault();
            const toastId = toast.info('Transaction in Progress', { autoClose: false });
            const transaction = await contract_nft.start_transport(tdata.transplant_id , data.id , data.name , data.plate_num , sign);
            await transaction.wait();
            toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
            axios.post(`http://localhost:8000/ambdetail/${tdata.transplant_id}` , data).then((response) => {
                console.log(response);
                window.location.reload(true);
            });
            console.log("thirdStage");
            setTimeout(() => {
            window.location.reload(true);
            },5000);
        }
        catch(error){
            toast.error("Something went wrong");
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
  return (
    <div>
        <ToastContainer/>
        <div className="form-button" style={tdata.stage >= 2 ? {display : "none"} : {}}>
            <button type="submit" onClick={(event) => clickAmb(event)}>Ambulance</button>
            <button type="submit" onClick={(event) => clickAir(event)}>AirLift</button>
        </div>


        <div className="form-containerss" style={tdata.stage >= 2 ? {display : "none"} : {}}>

            <div className="ambulance" style={amb == true ? {} : {display : "none"}}>
                <h1>Ambulance Details</h1>
                <form method="post">
                    <div className="col-md-12" style={{marginTop : "25px",marginLeft : "10px" , display : "flex" , flexDirection : "row"}}>
                        <label for="validationCustom01" className="form-label col-md-6" style={{fontSize : "23px", color : "#5ec576"}}>Id</label>
                        <input name='id' type="number" value={data.id} className="form-control" onChange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}} id="validationCustom01" required/>
                        <div className="valid-feedback">
                        Looks good!
                        </div>
                    </div>
                    
                    <div className="col-md-12" style={{marginTop : "25px",marginLeft : "10px" , display : "flex" , flexDirection : "row"}}>
                        <label for="validationCustom01" className="form-label col-md-6" style={{fontSize : "23px", color : "#5ec576" , marginRight : "23px"}}>Driver Name</label>
                        <input name='name' type="text" value={data.name} className="form-control"onChange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}} id="validationCustom01" required/>
                        <div className="valid-feedback">
                        Looks good!
                        </div>
                    </div>

                    <div className="col-md-12" style={{marginTop : "25px",marginLeft : "10px" , display : "flex" , flexDirection : "row"}}>
                        <label for="validationCustom01" className="form-label col-md-6" style={{fontSize : "23px", color : "#5ec576"}}>Car Number</label>
                        <input name='plate_num' type="alphanumeric" value={data.plate_num} className="form-control" onChange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}} id="validationCustom01" required/>
                        <div className="valid-feedback">
                        Looks good!
                        </div>
                    </div>

                    <div className="col-12" style={{marginTop : "20px" , marginLeft : "20px"}}>
                        <button className="btns btn-primary" style={{fontSize : "22px" , width : "100%"}} onClick={(event) => submitDatas(event)} type="submit">Submit</button>
                    </div>

                </form>
            </div>

            <div className="airlift" style={air == true ? {} : {display : "none"}} >
                <h1>Pilot Details</h1>
                <form  method="post">
                    <div className="col-md-12" style={{marginTop : "25px",marginLeft : "10px" , display : "flex" , flexDirection : "row"}}>
                        <label for="validationCustom01" className="form-label col-md-6" style={{fontSize : "23px", color : "#5ec576" , marginRight : "23px"}}>Pilot Name</label>
                        <input name='name' type="text" value={data.name} className="form-control"onChange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}} id="validationCustom01" required/>
                        <div className="valid-feedback">
                        Looks good!
                        </div>
                    </div>

                    <div className="col-md-12" style={{marginTop : "25px",marginLeft : "10px" , display : "flex" , flexDirection : "row"}}>
                        <label for="validationCustom01" className="form-label col-md-6" style={{fontSize : "23px", color : "#5ec576"}}>Id</label>
                        <input name='contact' type="number" value={data.id} className="form-control" onChange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}} id="validationCustom01" required/>
                        <div className="valid-feedback">
                        Looks good!
                        </div>
                    </div>

                    <div className="col-md-12" style={{marginTop : "25px",marginLeft : "10px" , display : "flex" , flexDirection : "row"}}>
                        <label for="validationCustom01" className="form-label col-md-6" style={{fontSize : "23px", color : "#5ec576"}}>Tail Number</label>
                        <input name='plate_num' value={data.plate_num} type="alphanumeric" className="form-control" onChange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}} id="validationCustom01" required/>
                        <div className="valid-feedback">
                        Looks good!
                        </div>
                    </div>

                    <div className="col-12" style={{marginTop : "20px" , marginLeft : "20px"}}>
                        <button className="btns btn-primary" style={{fontSize : "22px" , width : "100%"}} onClick = {(event) => submitData(event)} type="submit">Submit</button>
                    </div>

                </form>
            </div>
        </div>

        <div  style={tdata.stage >= 2 ? {marginTop : "20px"} : {display : "none"}} >
            <h1 style={{fontSize : "30px"}}> <span style={{color : "#5ec576"}}>Driver</span> Details</h1>
            {getData()}
            <div style={{display : "flex" , flexDirection : "row" , justifyContent : "center" , marginTop : "25px"}}>
                <label style={{fontSize : "22px"}}>Name : - &nbsp;&nbsp;</label>
                <h2 style={{marginTop : "2px" , color : "#5ec576" , fontSize : "21px"}}>{vehicle.name}</h2>
            </div>
            <div style={{display : "flex" , flexDirection : "row" , justifyContent : "center" , marginTop : "25px"}}>
                <label style={{fontSize : "22px"}}>Contact : - &nbsp;&nbsp;</label>
                <h2 style={{marginTop : "2px" , color : "#5ec576", fontSize : "21px"}}>{vehicle.contact}</h2>
            </div>
            <div style={{display : "flex" , flexDirection : "row" , justifyContent : "center" , marginTop : "25px"}}>
                <label style={{fontSize : "22px"}}>Vehicle Number : - &nbsp;&nbsp;</label>
                <h2 style={{marginTop : "2px" , color : "#5ec576", fontSize : "21px"}}>{vehicle.plate_num}</h2>
            </div>
        </div>
    </div>
  )
}

export default MultiForm