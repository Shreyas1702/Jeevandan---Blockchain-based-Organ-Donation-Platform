import React from 'react'
import DashAside from './DashAside'
import { Link } from 'react-router-dom';
import axios from 'axios';

const FailedTrans = ({account , state}) => {
    var [process , setProcess] = React.useState([]);

    React.useEffect(() => {
        async function getData(){
            
            var data;

            const {contract} = state;

            await axios.post("http://localhost:8000/getFailedTrans" , {account}).then((response) => {
                console.log(response);
                data = response.data.data;
            });

            // for(var i = 0 ; i < data.length ; i++){
            //     console.log(data[i]);
            //     const trans = await contract.getFailedTrans(data[i].transplant_id);
            //     console.log(trans);
            // }

            setProcess(data);
        }

        if(account != '')
            getData()
    } , [account])

    function getTableData(){
            console.log("getTableData")
            console.log("Process :-" , process)
            var num = 1;
        return process.map((data) => {
        const ids = data.transplant_id;  
        return (
            <tr style={{ fontSize : "1.5rem"}}>
                <td style={{paddingBottom : "15px" , paddingTop : "1.5rem"}}>{num++}</td>
                <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.transplant_id}</td>
                <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.donor_id.name}</td>
                <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.reciever_id.name}</td>
                <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>Failed</td>
                <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{<Link style={{margin : "0"}} to="/dashboard/TransplantPage" state = {{ tId : ids}}>View </Link>}</td>
            </tr>
            )
        })
    }

  return (
    <div style={{display : "flex"}}>
        <DashAside account={account} style={{marginTop : "20px" , marginLeft : "50px" , width : "170px"}}/>
        <div style={{width : "100%" , padding : "0px 100px" , marginTop : "80px"}}>
            <div class="recent-orders">
                <table>
                    <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Transplant Id</th>
                        <th>Donor Name</th>
                        <th>Reciever Name</th>
                        <th>Status</th>
                        <th>TimeLine</th>
                    </tr>
                    </thead>
                <tbody>
                    {getTableData()}
                </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default FailedTrans