import axios from 'axios';
import React from 'react'
import { ListGroupItem } from 'react-bootstrap';
import Navbar from './Navbar'

const DoctorPage = ({account , state}) => {

    const [detail , setDetail] = React.useState({});
    const [process , setProcess] = React.useState([]);
  
    React.useEffect(() => {

        const {contract_nft} = state;

        async function DocLog(){
            const val = await axios.post("http://localhost:8000/doctor/doclog" , {account});
            console.log(val);
            setDetail(val.data.data);
        }

        async function PatList(){
            console.log(contract_nft)
            console.log(typeof detail.id)
            const d = await contract_nft.DocPat(detail.id);
            console.log(d);
            var list = [];
            for(var i = 0 ; i < d.length ; i++){
                const donor_id = parseInt(d[i][0]);
                const donor_hosp = d[i][1];
                if(parseInt(d[i][5]) == detail.id){
                    const doc_id = parseInt(d[i][5]);
                    const sign = parseInt(d[i][7]);

                    const data = await axios.post("http://localhost:8000/doctor/getPatient" , {donor_id , donor_hosp});
                    console.log(data);
                    const name = data.data.donor[0].name;
                    const hosp_name = data.data.donor_hosp[0].username;
                    const ltd = data.data.donor_hosp[0].ltd;
                    const lngt = data.data.donor_hosp[0].lngt;
                    const city = data.data.city;
                    var status;
                    if(sign == 0)
                        status = 'Waiting';
                    else if(sign == 1)
                        status = 'Approved';
                    else    
                        status = 'Rejected'
                    const json = {
                        donor_id,
                        donor_hosp,
                        name,
                        hosp_name,
                        ltd,
                        sign,
                        lngt,
                        city,
                        status
                    }

                    list.push(json);
                        
                }
                else{
                    const doc_id = parseInt(d[i][4]);
                    const sign = parseInt(d[i][6]);

                    const data = await axios.post("http://localhost:8000/doctor/getPatient" , {donor_id , donor_hosp});
                    console.log(data);
                    const name = data.data.donor[0].name;
                    const hosp_name = data.data.donor_hosp[0].username;
                    const ltd = data.data.donor_hosp[0].ltd;
                    const lngt = data.data.donor_hosp[0].lngt;
                    const city = data.data.city;
                    var status;
                    if(sign == 0)
                        status = 'Waiting';
                    else if(sign == 1)
                        status = 'Approved';
                    else    
                        status = 'Rejected'
                    const json = {
                        donor_id,
                        donor_hosp,
                        name,
                        hosp_name,
                        ltd,
                        sign,
                        lngt,
                        city,
                        status
                    }

                    list.push(json);
                }
                    // }
                // }
            }
            setProcess(list);
        }

        if(contract_nft != '' && account != ''){
            setTimeout(() => {
                DocLog();
                console.log(detail)
                if(detail.id)
                    PatList();
            } , 1000);
        }
    },[account , state , detail.id]);

    async function signApproval(val , id){
        const {contract_nft} = state;
        console.log(id)
        const reciept = await contract_nft.signApproval(id , val);
        console.log(reciept)
    }

    function getTableData(){
    console.log("getTableData")
    console.log("Process :-" , process)
    var num = 1;
    return process.map((data) => {
        const ids = data.transplant_id;  
            return (
                <tr style={{ fontSize : "1.5rem"}}>
                    <td style={{paddingBottom : "15px" , paddingTop : "1.5rem"}}>{num++}</td>
                    <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.donor_id}</td>
                    <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.name}</td>
                    <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.hosp_name}</td>
                    <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>
                        <ul>
                            <li>Latitude :- {data.ltd}</li>
                            <li>Longitude : {data.lngt}</li>
                        </ul>
                    </td>
                    <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.city}</td>
                    {data.sign == 0 ? <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}> <button style={{padding : "10px" , backgroundColor : "#5ec567" , borderRadius : "8px" , color : "white" , marginRight : "20px"}} onClick = {() => signApproval(1 , data.donor_id)} type="submit">Approve</button> <button style={{padding : "10px" , backgroundColor : "#5ec567" , color : "white" , borderRadius : "8px" , marginRight : "20px"}} onClick = {() => signApproval(2 , data.donor_id)} type="submit">Reject</button> </td> : <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>Done</td> }
                    <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.status}</td>

                </tr>
            )
        })
    }

    return (
        <div>
            <Navbar/> 
            <p style={{color : "#5ec567" , paddingTop : "20px" , width : "100%" , fontSize : "22px" , paddingRight : "100px" , textAlign : "end"}}><span style={{paddingRight : "8px" , color : "black"}}>Welcome Doctor</span> <br></br> {detail.name} !!</p>
            <div class="recent-orders">
                <h2 style={{paddingLeft : "40px"}}><span style={{color : "#5ec567"  , fontSize : "22px"}}>Examinations :- </span></h2>
                <table style={{ width : "90%" , marginLeft : "80px" , marginTop : "30px"}}>
                    <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Donor Id</th>
                        <th>Donor Name</th>
                        <th>Hospital Name</th>
                        <th>Hospital Co-ordinates</th>
                        <th>City</th>
                        <th>Approval</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                <tbody>
                    {getTableData()}
                </tbody>
                </table>
                </div>
            </div>
    )
}

export default DoctorPage