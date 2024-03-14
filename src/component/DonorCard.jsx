import React from 'react'
import Aside from './Aside'

const DonorCard = ({account}) => {
  return (
    <div style={{display : "flex"}}>
        <Aside account={account} style={{marginTop : "60px" , marginLeft : "50px" , width : "80%"}}/>
        <div style={{marginTop:"40px" , width : "70%" , display: "flex" , flexWrap : "wrap" , justifyContent : "center" , height : "100vh" , marginRight : "10px" , marginLeft : "100px"}}>
            <div class="card" style={{width: "45rem" , height : "43rem", boxShadow : "0 5rem 5rem var(--color-light)" , borderRadius : "10px" , margin : "20px auto"}}>
                <div class="card-body" >
                    <h1 style={{fontWeight : "500" , marginTop:"20px" , textAlign : "center"}} class="card-title">Shreyas Keni</h1>
                    <h2 style={{fontSize: "18px" , marginTop:"20px" , textAlign : "center"}} class="card-title">Email :- sskeni1702@gmail.com</h2>
                    <h2 style={{fontSize: "18px" , marginTop:"20px" , marginLeft : "40px" }} class="card-title">Wallet Address :- 0xeddadea32ed194983c4A<br></br><span style={{marginLeft : "90px"}}>dc8a4D7832385f8Ca23a</span></h2>
                    <div style={{display : "flex" , flexDirection : "row" , marginTop : "25px" , marginLeft : "40px"}}>
                        <h2 style={{ fontSize: "18px"}}>BloodGroup :- O+</h2>
                        <h2 style={{marginLeft : "100px" ,  fontSize: "18px"}}>HLA :- HLA-A</h2>
                    </div>
                    <div style={{display : "flex" , flexDirection : "row" , marginTop : "25px" , marginLeft : "40px"}}>
                        <h2 style={{ fontSize: "18px"}}>Weight :- 80kg</h2>
                        <h2 style={{marginLeft : "100px" ,  fontSize: "18px"}}>Height :- 210cm</h2>
                    </div>
                    <div style={{display : "flex" , flexDirection : "row" , marginTop : "25px" , marginLeft : "40px"}}>
                        <h2 style={{ fontSize: "18px"}}>Age :- 22</h2>
                        <h2 style={{marginLeft : "60px" ,  fontSize: "18px"}}>KinContact :- 9892124646</h2>
                    </div>
                    <div style={{display : "flex" , flexDirection : "row" , marginTop : "25px" , marginLeft : "40px"}}>
                        <h2 style={{ fontSize: "18px"}}>Organs Pledged:- [Kidney , Pancreas , Liver]</h2>
                    </div>
                    <div style={{display : "flex" , justifyContent : "center" , marginTop : "25px"}}>
                        <button type="submit" className = "btn btn-success">Check Report</button>
                    </div>
                </div>
            </div>
            <div class="card" style={{width: "45rem" , height : "43rem", boxShadow : "0 5rem 5rem var(--color-light)" , borderRadius : "10px" , marginLeft : "20px" , marginRight : "20px"}}>
                <div class="card-body" >
                    <h1 style={{fontWeight : "500" , marginTop:"20px" , textAlign : "center"}} class="card-title">Shreyas Keni</h1>
                    <h2 style={{fontSize: "18px" , marginTop:"20px" , textAlign : "center"}} class="card-title">Email :- sskeni1702@gmail.com</h2>
                    <h2 style={{fontSize: "18px" , marginTop:"20px" , marginLeft : "40px" }} class="card-title">Wallet Address :- 0xeddadea32ed194983c4A<br></br><span style={{marginLeft : "90px"}}>dc8a4D7832385f8Ca23a</span></h2>
                    <div style={{display : "flex" , flexDirection : "row" , marginTop : "25px" , marginLeft : "40px"}}>
                        <h2 style={{ fontSize: "18px"}}>BloodGroup :- O+</h2>
                        <h2 style={{marginLeft : "100px" ,  fontSize: "18px"}}>HLA :- HLA-A</h2>
                    </div>
                    <div style={{display : "flex" , flexDirection : "row" , marginTop : "25px" , marginLeft : "40px"}}>
                        <h2 style={{ fontSize: "18px"}}>Weight :- 80kg</h2>
                        <h2 style={{marginLeft : "100px" ,  fontSize: "18px"}}>Height :- 210cm</h2>
                    </div>
                    <div style={{display : "flex" , flexDirection : "row" , marginTop : "25px" , marginLeft : "40px"}}>
                        <h2 style={{ fontSize: "18px"}}>Age :- 22</h2>
                        <h2 style={{marginLeft : "60px" ,  fontSize: "18px"}}>KinContact :- 9892124646</h2>
                    </div>
                    <div style={{display : "flex" , flexDirection : "row" , marginTop : "25px" , marginLeft : "40px"}}>
                        <h2 style={{ fontSize: "18px"}}>Organs Pledged:- [Kidney , Pancreas , Liver]</h2>
                    </div>
                    <div style={{display : "flex" , justifyContent : "center" , marginTop : "25px"}}>
                        <button type="submit" className = "btn btn-success">Check Report</button>
                    </div>
                </div>
            </div>           
        </div>
    </div>
  )
}

export default DonorCard