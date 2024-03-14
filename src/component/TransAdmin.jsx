import React from 'react'
import Aside from './Aside'

const TransAdmin = ({account}) => {
  return (
    <div style={{display : "flex"}}>
        <Aside account={account} style={{marginTop : "60px" , marginLeft : "50px" , width : "80%"}}/>
        <div className="recent-orders" style={{marginTop : "50px" , marginLeft : "80px"}}>
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
              </tr>
            </thead>
          <tbody>
            {/* {getTableData()} */}
          </tbody>
          </table>
        </div>
    </div>
  )
}

export default TransAdmin