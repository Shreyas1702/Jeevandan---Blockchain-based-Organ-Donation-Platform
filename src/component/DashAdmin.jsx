import React from 'react'
import "./../style.css"
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Aside from './Aside';
import Select from "react-select";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer , toast } from 'react-toastify';


const DashAdmin = ({ account, setAccount , state ,setState}) => {

  const [loading , setloading] = React.useState(true);
  var [process , setProcess] = React.useState([]);
  const [show, setShow] = React.useState(false);

   const [skills, setSkills] = React.useState([]);

   const [skills2, setSkills2] = React.useState([]);
  
  const [data , setData] = React.useState({
    no_donor : Number,
    no_reciever : Number,
    total_pt: Number,
    complete_trans : Number,
    incomplete_trans: Number,
    donor : Array,
    reciever : Array,
    completed_d_trans : Array,
    incompleted_d_trans : Array
  });

  const [func , setFunc] = React.useState(true);
  const {contract_nft} = state;

  React.useEffect(() => {
    
    setTimeout(async () => {
      const ddata = await getEntireData();
      setData(ddata)

      setloading(false);
    } , 3000);

    async function getBrain(){
      console.log("Get Brain Dead :- ")
      const datas = await contract_nft.getAllBDs();
      console.log(datas);
      const list = [];
      for(var i = 0 ; i < datas.length ; i++){
        if(datas[i][2] == '0x0000000000000000000000000000000000000000'){
          const doctors = [];
          const id = parseInt(datas[i][0]);
          const donor_hosp = datas[i][1];
          const d = {id , donor_hosp};
          const data = await axios.post("http://localhost:8000/admin/getEntiredData" , d);

          for(var i = 0 ; i < data.data.docs.length ; i++){
            const value = data.data.docs[i].meta_address;
            const label = data.data.docs[i].name;
            const id = data.data.docs[i].id;
            doctors.push({value , label , id});
          }

          console.log(data.data.donor[0])

          const name = data.data.donor[0].name;
          const json = {
            name : name,
            id : id,
            doctors,
            success : false,
          }

          list.push(json);
        }
        else{
          const id = parseInt(datas[i][0]);
          const donor_hosp = datas[i][1];
          const doc1 = datas[i][2];
          const doc2 = datas[i][3];
          const d = {id , donor_hosp , doc1 , doc2};
          const data = await axios.post("http://localhost:8000/admin/getEntiredDatas" , d);
          console.log(data);
          const name = data.data.donor[0].name;
          const doc_1 = data.data.doc_1.name;
          const doc_2 = data.data.doc_2.name;

          const json = {
            name : name,
            id : id,
            doc_1 : doc_1,
            doc_2 : doc_2,
            success : true,
          }

          list.push(json);
        }
      }

      setProcess(list);
      console.log("Datas : - " , list);
    }

    if(contract_nft)
      getBrain();

  },[account , state , func])

  function handleClose(){
    show = false;
  }

  async function getEntireData(){
      const d = {account}
      var dta; 
      console.log("Account :- " , account)
      const da = await axios.post("http://localhost:8000/admin/getEntire" , d).then((response) => {
        console.log(response.data)
        dta = response.data;
      });
      return dta;
    }

  const handleChanges = (skills) => {
    setSkills(skills || []);
    console.log(skills);
  };

  const handleChanges2 = (skills2) => {
    setSkills2(skills2 || []);
    console.log(skills2);
  };

  async function submitDocs(id){
    const toastId = toast.info('Transaction in Progress', { autoClose: false });
    await contract_nft.reg_braindead(id , skills.value , skills2.value , skills.id , skills2.id  , "0x5AC86Bf7789605c54F1fa68e63697de9a8875437");
    toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
    setTimeout(() => {
      window.location.reload(true);
    },8000)
  }

  function getTableData(){
    // console.log("getTableData")
    // console.log("Process :-" , process)
    var num = 1;
    return process.map((data) => {
      console.log(data)
      if(data.success == false){  
      return (
          <tr style={{ fontSize : "1.5rem"}} className = "Admin">
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem"}}>{num++}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.id}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.name}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}><Select
                    options={data.doctors}
                    onChange= {handleChanges}
                    value={skills}
                    style={{ fontSize : "18px" , width : "90px"  , color : "black" , height : "30px"}}
                    
                    /></td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}><Select
                    options={data.doctors}
                    onChange= {handleChanges2}
                    value={skills2}
                    style={{ fontSize : "18px" , width : "90px"  , color : "black" , height : "30px"}}
                    /></td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}><button type="submit" onClick={(event) => submitDocs(data.id)} style={{padding : "10px 20px" , fontSize : "17px" , borderRadius : "10px" , backgroundColor: "#5ec567" , color : "white"}}>Submit</button></td>
          </tr>
        )
      }
      else{
        return (
        <tr style={{ fontSize : "1.5rem"}}>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem"}}>{num++}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.id}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.name}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.doc_1}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.doc_2}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>Completed</td>
          </tr>
        )
      }
    })
  }


  return (
    <div className='containerss'>
        <Aside account={account} data={data}/>
      <main>
        <ToastContainer/>
        <div class="insights">
          <div class="sales">
            <span class="material-icons-sharp"> analytics </span>
            <div class="middle">
              <div class="left">
                <h3>Total Patient Registered</h3>
                <h1>{data.total_pt}</h1>
              </div>
              <div className='progress'>
                <CircularProgressbar width={50} strokeWidth={15} text={data.total_pt} circleRatio={1} value={data.total_pt} styles={buildStyles({
                    textSize: '16px',
                    // Colors
                    
                    pathColor: `#55c57a`,
                    textColor: 'black',
                    textSize:"23px"
                    // backgroundColor: "#e9ecef",
                })} />
              </div>

            </div>
          </div>
          <div class="expenses">
            <span class="material-icons-sharp"> bar_chart </span>
            <div class="middle">
              <div class="left">
                <h3>Active Transplant Process</h3>
                <h1>{data.incomplete_trans}</h1>
              </div>
              <div className='progress'>
                <CircularProgressbar width={50} strokeWidth={15} text={data.incomplete_trans} circleRatio={1} value={data.incomplete_trans} styles={buildStyles({
                    textSize: '16px',
                    // Colors
                    
                    pathColor: `#55c57a`,
                    textColor: 'black',
                    textSize:"23px"
                    // backgroundColor: "#e9ecef",
                })} />
              </div>
            </div>
          </div>
          {/* <!------------------------------------End of expenses--> */}
          <div class="income">
            <span class="material-icons-sharp"> stacked_line_chart </span>
            <div class="middle">
              <div class="left">
                <h3>Completed Transplant process</h3>
                <h1>{data.complete_trans}</h1>
              </div>
              <div className='progress'>
                <CircularProgressbar width={50} strokeWidth={15} text={data.complete_trans} circleRatio={1} value={data.complete_trans} styles={buildStyles({
                    textSize: '16px',
                    // Colors
                    
                    pathColor: `#55c57a`,
                    textColor: 'black',
                    textSize:"23px"
                    // backgroundColor: "#e9ecef",
                })} />
              </div>
            </div>
          </div>

          {/* <!-------------------------End of INCOMES---> */}
        </div>
        {/* <!--------------------------End of Insights--> */}
        <div class="recent-orders">
          <h2>Ongoing <span style={{color : "#5ec567"}}>Process</span></h2>
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Donor Id</th>
                <th>Donor Name</th>
                <th>Doctor 1</th>
                <th>Doctor 2</th>
                <th>Status</th>
              </tr>
            </thead>
          <tbody>
            {getTableData()}
          </tbody>
          </table>
          <a href="#" style={{fontSize : "18px"}}>Show All</a>
        </div>
      </main>
      <div class="right">
        <div class="top">
          <button id="menu-btn">
            <span id="men" class="material-icons-sharp">menu</span>
          </button>
          {/* <div class="theme-toggler">
            <span class="material-icons-sharp active">light_mode</span>
            <span class="material-icons-sharp">dark_mode</span>
          </div> */}
          {/* <div class="profile">
            <div class="info">
              <p style={{fontSize : "1rem"}}>Hey,<b>username </b></p>
              <small class="text-muted"> Admin </small>
            </div>
            <div class="profile-photo"> */}
              {/* <!-- <img src="./images/profile1.jpeg" alt="" srcset="" /> --> */}
            {/* </div>
          </div> */}
        </div>
        {/* <!-----------End of Top---------------------> */}
        {/* <!-- <div class="recent-updates">
          <h2>Recent Updates</h2>
          <div class="updates">
            <div class="update">
              <div class="profile-photo">
                <img src="./images/download.jpg" alt="" srcset="" />
              </div>
              <div class="message">
                <p>
                  <b>Bilal</b> recived his order of Night lion tech GPS drone.
                </p>
                <small class="text-muted">2 Minutes Ago</small>
              </div>
            </div>
            <div class="update">
              <div class="profile-photo">
                <img src="./images/Screenshot (425).png" alt="" srcset="" />
              </div>
              <div class="message">
                <p>
                  <b>Bilal</b> recived his order of Night lion tech GPS drone.
                </p>
                <small class="text-muted">2 Minutes Ago</small>
              </div>
            </div>
            <div class="update">
              <div class="profile-photo">
                <img src="./images/jk.jpg" alt="" srcset="" />
              </div>
              <div class="message">
                <p>
                  <b>Bilal</b> recived his order of Night lion tech GPS drone.
                </p>
                <small class="text-muted">2 Minutes Ago</small>
              </div>
            </div>
          </div>
        </div> --> */}
        {/* <!---------------END OF RECENT UPDATES--> */}
        <div class="sales-analytics">
          <h2>Paitent Analytics</h2>
          <div class="item online">
            <div class="icon">
              <span class="material-icons-sharp"> shopping_cart </span>
            </div>
            <div class="right">
              <div class="info">
                <h3>Registered Donor</h3>
              </div>
              {/* <!-- <h5 class="success">+39%</h5> --> */}
              <h3>{data.no_donor}</h3>
            </div>
          </div>
          <div class="item offline">
            <div class="icon">
              <span class="material-icons-sharp"> local_mall </span>
            </div>
            <div class="right">
              <div class="info">
                <h3>Registered Reciever</h3>
              </div>
              {/* <!-- <h5 class="success">-17%</h5> --> */}
              <h3>{data.no_reciever}</h3>
            </div>
          </div>
          {/* <!-- <div class="item customers">
            <div class="icon">
              <span class="material-icons-sharp"> person </span>
            </div>
            <div class="right">
              <div class="info">
                <h3>New Customers</h3>
              </div>
              <h5 class="success">+25%</h5>
              <h3>849</h3>
            </div>
          </div> --> */}

          {/* <!-- <div class="item add-product">
            <div onclick="openCModal()">
              <span class="material-icons-sharp">add</span>
              <h3>Verify Patient</h3>
            </div>
          </div> --> */}
          <div class="item add-product">
            <div>
              <span class="material-icons-sharp">add</span>
              <a href="/verify/user">
                <h3>Verify Patient</h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashAdmin