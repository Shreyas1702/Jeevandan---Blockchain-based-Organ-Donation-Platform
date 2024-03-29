import React from 'react'

const Aside = ({account , style}) => {
  return (
    <div>
        <aside style={style}>
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
          <a href="/">
            <span class="material-icons-sharp"> home </span>
            <h3>Home</h3>
          </a>
          <a href="/dashboard_admin">
                <span class="material-icons-sharp"> grid_view </span>
                <h3>Dashboard</h3>
          </a>
          {account != ' ' ? <a href="#" className='acc_hov' style={{backgroundColor : "#5ec567" , paddingLeft : "5px" , borderRadius : "10px" , color : "white"}}>
            <span class="material-icons-sharp"> account_circle </span>
            <h3>{account.slice(0, 6) + "...." + account.slice(38, 42)}</h3>
          </a> : <a href="#" className='acc_hov' style={{backgroundColor : "#5ec567" , paddingLeft : "5px" , borderRadius : "10px" , color : "white"}}>
            <span class="material-icons-sharp"> account_circle </span>
          </a>}
          <a href="/dashboard_admin/donors">
            <span class="material-icons-sharp"> volunteer_activism </span>
            <h3>Donors</h3>
          </a>
          <a href="/dashboard_admin/reciever">
            <span class="material-icons-sharp"> monitor_heart </span>
            <h3>Recievers</h3>
          </a>
          <a href="/dashboard_admin/transAdmin">
            <span class="material-icons-sharp"> spellcheck </span>
            <h3>Transplant Process</h3>
          </a>
          <a href="#">
            <span class="material-icons-sharp"> logout </span>
            <h3>Logout</h3>
          </a>
        </div>
      </aside>
    </div>
  )
}

export default Aside