import axios from 'axios';
import React from 'react'
import { ListGroupItem } from 'react-bootstrap';
import { ToastContainer , toast } from 'react-toastify';
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

        function areObjectsEqual(obj1, obj2) {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }

        function filterUniqueObjects(arr) {
            const uniqueArray = [];
            arr.forEach((obj) => {
                // Check if the object is unique
                if (!uniqueArray.some((uniqueObj) => areObjectsEqual(uniqueObj, obj))) {
                uniqueArray.push(obj);
                }
            });
            return uniqueArray;
        }

        async function PatList(){
            console.log(contract_nft)
            console.log(typeof detail.id)
            var das = await contract_nft.DocPat(detail.id);
            var d = [];
            for(var i = 0 ; i < das.length ; i++){
                var zero = parseInt(das[i][0]);
                var one = (das[i][1]);
                var two = (das[i][2]);
                var three = (das[i][3]);
                var four = parseInt(das[i][4])
                var five = parseInt(das[i][5])
                var six = parseInt(das[i][6])
                var seven = parseInt(das[i][7])
                var eight = (das[i][8])
                var nine = (das[i][9])
                var ten = parseInt(das[i][10])

                var json = {
                    zero,
                    one,
                    two,
                    three,
                    four,
                    five,
                    six,
                    seven,
                    eight,
                    nine,
                    ten
                }

                d.push(json);
            }

            d = filterUniqueObjects(d);
            console.log(d);
            var list = [];
            for(var i = 0 ; i < d.length ; i++){
                const donor_id = parseInt(d[i].zero);
                const donor_hosp = d[i].one;
                if(parseInt(d[i].five) == detail.id){
                    const doc_id = parseInt(d[i].five);
                    const sign = parseInt(d[i].seven);

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
                    const doc_id = parseInt(d[i].four);
                    const sign = parseInt(d[i].six);

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
        try{
            const {contract_nft} = state;
            console.log(id)
            
            const toastId = toast.info('Transaction in Progress', { autoClose: false });
            const reciept = await contract_nft.signApproval(id , val);
            await reciept.wait()

            console.log(reciept);
            toast.update(toastId, { render: 'Transaction Successful', type: 'success', autoClose: 8000 });
            
            setTimeout(() => {
                window.location.reload(true);
            },10000)
        }
        catch(error){
            console.log(error);
        }
    }

    function getTableData(){
    // console.log("getTableData")
    // console.log("Process :-" , process)
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
            <ToastContainer/>
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