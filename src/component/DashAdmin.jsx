import React from 'react'
import "./../style.css"
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Aside from './Aside';

const DashAdmin = ({ account, setAccount , state ,setState}) => {

  const [loading , setloading] = React.useState(true);
  var [process , setProcess] = React.useState([]);
  const [data , setData] = React.useState({
    no_donor : Number,
    no_reciever : Number,
    total_pt: Number,
    complete_trans : Number,
    incomplete_trans: Number,
  });

  const [func , setFunc] = React.useState(true);

  React.useEffect(() => {
    setTimeout(async () => {
      const ddata = await getEntireData();
      console.log(ddata.ongoing_p.length)
      setProcess(ddata.ongoing_p);
      setData(ddata)
      console.log(process);
      console.log("Data :- " , data);
      setloading(false);
    } , 5000)

  },[account])



  async function getEntireData(){
      const d = {account}
      var dta; 
      console.log("Account :- " , account)
      const da = await axios.post("http://localhost:8000/getEntireData" , d).then((response) => {
        console.log(response.data)
        dta = response.data;
      });
      return dta;
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
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.transplant_id}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.donor_id.name}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.reciever_id.name}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.stage}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{<Link style={{margin : "0"}} to="/dashboard/TransplantPage" state = {{ tId : ids}}>View </Link>}</td>
          </tr>
        )
    })
  }


  return (
    <div className='containerss'>
        {console.log(account)}
        <Aside account={account}/>
      <main>
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
                <th>Transplant Id</th>
                <th>Donor Name</th>
                <th>Reciever Name</th>
                <th>Stage</th>
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