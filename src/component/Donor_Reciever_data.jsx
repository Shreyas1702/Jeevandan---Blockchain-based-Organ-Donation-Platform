import React from 'react'

const Donor_Reciever_data = ({tranData , organ , dhosp , rhosp}) => {
    console.log(tranData);
    console.log(organ);
    return (
      <div style={{display : "flex" , flexDirection : "row"  , justifyContent : "center" , marginTop : "40px"}}>
            <div class="card mb-5" style={{maxWidth: "800px" , boxShadow: "0 2rem 3rem var(--color-light)" , position : "relative"}}>
                <div class="row g-0">
                    <div class="col-md-5">
                    <img style={{backgroundSize : "cover" , border : "0.5px solid #D1D1D1" , minWidth: "100%" , height: "350px"}} src="/donor.jpeg" class="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div class="col-md-7 circle">
                        <div class="ag-courses-item_bg"></div>
                        <div class="card-body" style={{padding:"1rem 0rem",marginTop : "30px"}}>
                            <div style={{display : "flex" , flexDirection : "row" , marginBottom : "0"}}>
                                <h2 class="card-title">Donor</h2>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text" style={{marginTop : "3px" , marginBottom : "1rem"}}>{tranData.donor_id.name}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">BloodGroup :- </p>
                                <p class="card-text">&nbsp;&nbsp;{tranData.donor_id.bloodgroup}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">HLA-Type :- </p>
                                <p class="card-text">&nbsp;&nbsp;{tranData.donor_id.hla.toUpperCase()}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">Hospital Name :- </p>
                                <p class="card-text">&nbsp;{dhosp.username}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">Organ :- </p>
                                <p class="card-text">&nbsp;&nbsp;{organ.charAt(0).toUpperCase() + organ.slice(1 , organ.length)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{width : "70px" , marginTop : "150px" , paddingLeft : "8px"}}>
                <i class="fa-solid fa-arrow-right-long fa-5x" style={{color: "#5ec576"}}></i>
            </div>

            <div class="card mb-5" style={{maxWidth: "800px" , boxShadow: "0 2rem 3rem var(--color-light)" , position : "relative"}}>
                <div class="row g-0">
                    <div class="col-md-5">
                    <img style={{backgroundSize : "cover" , border : "0.5px solid #D1D1D1" , minWidth: "100%" , height: "350px"}} src="/reciever.jpeg" class="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div class="col-md-7 circle">
                        <div class="ag-courses-item_bg"></div>
                        <div class="card-body" style={{marginTop : "30px"}}>
                            <div style={{display : "flex" , flexDirection : "row" , marginBottom : "0"}}>
                                <h2 class="card-title">Reciever</h2>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text" style={{marginTop : "3px" , marginBottom : "1rem"}}>{tranData.reciever_id.name}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">BloodGroup :- </p>
                                <p class="card-text">&nbsp;&nbsp;{tranData.reciever_id.bloodgroup}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">HLA-Type :- </p>
                                <p class="card-text">&nbsp;&nbsp;{tranData.reciever_id.hla.toUpperCase()}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">Hospital Name :- </p>
                                <p class="card-text">&nbsp;{rhosp.username}</p>
                            </div>
                            <div style={{display : "flex" , flexDirection : "row"}}>
                                <p class="card-text">Organ :- </p>
                                <p class="card-text">&nbsp;&nbsp;{organ.charAt(0).toUpperCase() + organ.slice(1 , organ.length)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Donor_Reciever_data