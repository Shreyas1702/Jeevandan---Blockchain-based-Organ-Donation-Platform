import React from 'react'
import Aside from './Aside'
import axios from "axios"
import { Link } from 'react-router-dom'
const TransAdmin = ({account}) => {
    const [data , setData] = React.useState([]);

    React.useEffect(() => {
        async function getData(){
            var dd;
            try{
                await axios.post("http://localhost:8000/admin//getTrans" , data).then((response) => {
                    console.log(response);

                    dd =  response.data;
                })
            }
            catch(e){
                console.log(e);
            }

            return dd;
        }

        setTimeout(async () => {
            const d = await getData();
            console.log(d.donor)
            setData(d.donor);
        })
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getTableData(){
    console.log("getTableData")
    console.log("Process :-" , data)
    var num = 1;
    return data.map((data) => {
      var list = [];
      const ids = data.transplant_id;  
      return (
          <tr style={{ fontSize : "1.5rem"}}>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem"}}>{num++}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.transplant_id}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.donor_id.name}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.reciever_id.name}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.donor_hosp.username}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.reciever_hosp.username}</td>
            {data.success ? <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>Completed</td> : <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>Ongoing</td>}
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{<Link style={{margin : "0"}} to="/dashboard/TransplantPage" state = {{ tId : ids}}>View </Link>}</td>
          </tr>
        )
    })
  }
  return (
    <div style={{display : "flex"}}>
        <Aside account={account} style={{marginTop : "60px" , marginLeft : "50px" , width : "70%"}}/>
        <div className="recent-orders" style={{marginTop : "50px" , marginLeft : "30px"}}>
          <table>
            <thead>
              <tr>
                <th style={{paddingLeft : "35px" , paddingRight : "35px"}}>Sr No.</th>
                <th style={{paddingLeft : "35px" , paddingRight : "35px"}}>Transplant Id</th>
                <th style={{paddingLeft : "35px" , paddingRight : "35px"}}>Donor Name</th>
                <th style={{paddingLeft : "35px" , paddingRight : "35px"}}>Reciever Name</th>
                <th style={{paddingLeft : "35px" , paddingRight : "35px"}}>Donor Hospital</th>
                <th style={{paddingLeft : "35px" , paddingRight : "35px"}}>Reciever Hospital</th>
                <th style={{paddingLeft : "35px" , paddingRight : "35px"}}>Status</th>
                <th style={{paddingLeft : "35px" , paddingRight : "35px"}}>View Timeline</th>
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

export default TransAdmin