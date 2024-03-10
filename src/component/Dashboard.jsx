import React from 'react'
import "./../style.css"
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Dashboard = () => {
  return (
    <div className='containerss'>
        <aside>
        <div class="top">
          <div class="logo">
            <h2 style={{fontSize : "2rem" , marginTop : "1rem"}}>
              <span style={{ color: "#5ec576" }}>Jeeva</span>ndan
            </h2>
          </div>
          <div class="close" id="close-btn">
            <span class="material-icons-sharp">close</span>
          </div>
        </div>
        <div class="sidebar">
          <a href="/dashboard">
                <span class="material-icons-sharp"> grid_view </span>
                <h3>Dashboard</h3>
            </a>
          <a href="/dashboard/DonorForm">
            <span class="material-icons-sharp"> person_outline </span>
            <h3>Donor Entry</h3>
          </a>
          <a href="/dashboard/ReceiverForm">
            <span class="material-icons-sharp"> receipt_long </span>
            <h3>Reciever Entry</h3>
          </a>
          <a href="/dashboard/MatchingPage">
            <span class="material-icons-sharp"> insights </span>
            <h3>Organ Matching</h3>
          </a>

          <a href="/dashboard/DonorForm">
            <span class="material-icons-sharp"> add </span>
            <h3>Living Donation</h3>
          </a>
          <a href="#">
            <span class="material-icons-sharp"> logout </span>
            <h3>Logout</h3>
          </a>
        </div>
      </aside>
      <main>
        <div class="insights">
          <div class="sales">
            <span class="material-icons-sharp"> analytics </span>
            <div class="middle">
              <div class="left">
                <h3>Total Patient Registered</h3>
                <h1>88</h1>
              </div>
              <div className='progress'>
                <CircularProgressbar width={50} strokeWidth={15} text={100} circleRatio={1} value={66} styles={buildStyles({
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
                <h1>56</h1>
              </div>
              <div className='progress'>
                <CircularProgressbar width={50} strokeWidth={15} text={100} circleRatio={1} value={66} styles={buildStyles({
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
                <h1>32</h1>
              </div>
              <div className='progress'>
                <CircularProgressbar width={50} strokeWidth={15} text={100} circleRatio={1} value={66} styles={buildStyles({
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
            <tr style={{ fontSize : "1.5rem"}}>
                <td style={{paddingBottom : "15px" }}>1</td>
                <td style={{paddingBottom : "15px" }}>Shreyas Keni</td>
                <td style={{paddingBottom : "15px" }}>9892124646</td>
                <td style={{paddingBottom : "15px" }}>9:30</td>
                <td style={{paddingBottom : "15px" }}>M</td>
                <td style={{paddingBottom : "15px" }}>Accepted</td>
            </tr>
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
              <h3>3849</h3>
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
              <h3>1100</h3>
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

export default Dashboard