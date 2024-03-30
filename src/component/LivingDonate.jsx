import React from 'react'
import DashAside from './DashAside'
import axios from 'axios';
import { toast , ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const LivingDonate = ({account , state}) => {

const [data  , setData] = React.useState({
  donor_id : 0,
  reciever_id : 0,
  organ : "",
});

const [process , setProcess] = React.useState([]);

React.useEffect(() => {
    const {contract_living} = state;

        async function getData(){

            console.log(contract_living);

            const living_data = await contract_living.getAllLiving();

            console.log(living_data);

            var list = [];

            for(var i = 0 ; i < living_data.length ; i++){
                const trans_id = parseInt(living_data[i][0]);
                const donor_id = parseInt(living_data[i][1]);
                const recie_id = parseInt(living_data[i][2]);
                const stage = parseInt(living_data[i][4]);
                const status = parseInt(living_data[i][5]);
                const organ = living_data[i][3];

                var data ;

                await axios.post("http://localhost:8000/living/getDonor_id" , {account , donor_id , recie_id}).then((response) => {
                    // console.log(response);
                    data = response.data;
                });

                console.log(data);

                if(status == 2){
                    const failed = await contract_living.getFailed(trans_id);
                    data.failed = failed;
                }

                var json = {
                    trans_id,
                    donor_id,
                    recie_id,
                    stage,
                    status,
                    organ,
                    data,
                }

                list.push(json);
            }
            
            setProcess(list);
        }

        if(account != '' && contract_living != undefined)
            getData()
    } , [account , state])

    function getTableData(){
            console.log("getTableData")
            console.log("Process :-" , process)
            var num = 1;
        return process.map((data) => {

        const ids = data.trans_id;  
        // console.log( data.trans_id)
        return (
            <tr style={{ fontSize : "1.5rem"}}>
                <td style={{paddingBottom : "15px" , paddingTop : "1.5rem"}}>{num++}</td>
                <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.trans_id}</td>
                <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.data.donor_id.name}</td>
                <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.data.reciever_id.name}</td>
                {data.status == 0 ? <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>Ongoing</td> : data.status == 1 ? <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>Completed</td> : <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>Failed</td> }
                <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{<Link style={{margin : "0"}} to="/dashbaord/living/TransplantPage" state = {{ tId : ids , data : data}}>View </Link>}</td>
            </tr>
            )
        })
    }

const SubmitForm = async (e) => {
  e.preventDefault()

  console.log(data);

  const {contract_living} = state;
  
  const trans = await contract_living.LivingTransDetails(data.donor_id , data.reciever_id , data.organ , "0x28A8508855b055a7Bdb3bC9094320C12f5D282c6")
  
  const toastId = toast.info('Transaction in Progress', { autoClose: false });
  
  await trans.wait();

  toast.update(toastId, { render: 'Transaction Successfull', type: 'success', autoClose: 8000 });

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

  return (
    <div style={{display : "flex"}}>
        <ToastContainer/>
        <DashAside account={account} style={{marginTop : "20px" , marginLeft : "50px" , width : "90%"}}/>
        <div>
            <div style={{marginLeft : "180px"}}>
                <h1 style={{textAlign : "center" , color : "#5ec567" , marginTop : "60px"}}>Living Donation Process</h1>
                <form class="row g-3 needs-validation" novalidate>
                    <div className="col-md-3" style={{marginTop : "50px",marginLeft:"10px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576" , backgroundColor : "#5ec576" , color : "white"}}>Donor Id</span>
                            <input name='donor_id' type="number" min="1" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "43px" , width: "150px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend"  required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3" style={{marginTop : "50px",marginLeft:"100px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576" , backgroundColor : "#5ec576" , color : "white"}}>Reciever Id</span>
                            <input name='reciever_id' type="number" min="1" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "43px" , width: "150px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend"  required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3" style={{marginTop : "50px",marginLeft:"100px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576" , backgroundColor : "#5ec576" , color : "white"}}>Organ</span>
                            <input name='organ' type="text" min="1" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "43px" , width: "150px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend"  required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>

                    <div className="col-8" style={{ margin :" 0 auto "}}>
                        <button className="btns btn-primary" style={{width : "100%" , fontSize : "22px", marginTop: "60px"} } onClick={(event) => SubmitForm(event)} type="submit">Start Process</button>
                    </div>
                </form>
            </div>
            <div style={{width : "100%" , padding : "0px 10px" , marginLeft : "100px" , marginTop : "20px" , paddingRight : "70px"}}>
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
    </div>
  )
}

export default LivingDonate