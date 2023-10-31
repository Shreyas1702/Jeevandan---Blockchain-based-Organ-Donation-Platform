import React from 'react'

const SignIn = () => {
    
    const [longitude  , setLongitude] = React.useState();
    const [latitude  , setLatitude] = React.useState();

    function getLoc(e) {
    e.preventDefault();
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

    function showPosition(position) {
    console.log(position)
    var lat = (position.coords.latitude)
    var long = (position.coords.longitude)

   
    setLatitude(position.coords.latitude.toFixed(6))
    setLongitude(position.coords.longitude.toFixed(6))
}
  
    return (
    <div className="hosp-reg-form">
        <div className='hosp-register'>
            <form class="row g-3 needs-validation" noValidate>
                <div className="col-md-12">
                    <label for="validationCustom01" className="form-label" style={{fontSize : "20px", color : "#5ec576"}}>Hospital Name</label>
                    <input type="text" className="form-control" style={{height: "35px" , fontSize : "18px"}} id="validationCustom01" required/>
                    <div className="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div className="col-md-12">
                    <label for="validationCustom02" className="form-label" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}} >Hospital Id</label>
                    <input type="text" className="form-control" id="validationCustom02" style={{height: "35px" , fontSize : "18px"}} required/>
                    <div className="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div className="col-md-12">
                    <label for="validationCustomUsername" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}} className="form-label">Email</label>
                    <div className="input-group has-validation">
                    <input type="text" className="form-control" id="validationCustomUsername" style={{height: "35px" , fontSize : "18px"}} aria-describedby="inputGroupPrepend" required/>
                    <div className="invalid-feedback">
                        Please choose a username.
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <label for="validationCustom03" className="form-label" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}}>City</label>
                    <input type="text" className="form-control" id="validationCustom03" style={{height: "35px", fontSize : "18px"}} required/>
                    <div className="invalid-feedback">
                    Please provide a valid city.
                    </div>
                </div>
                <div className="col-md-6">
                    <label for="validationCustom04" className="form-label" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}}>State</label>
                    <select  className="form-select" id="validationCustom04" style={{height: "35px", fontSize : "18px"}} required>
                    <option selected disabled value="">Choose...</option>
                    <option>Maharastra</option>
                    <option>Gujarat</option>
                    <option>Rajasthan</option>
                    <option>Kerala</option>
                    <option>Karnataka</option>
                    <option>Uttar Pradesh</option>
                    </select>
                    <div className="invalid-feedback">
                    Please select a valid state.
                    </div>
                </div>                    
                    <div className="col-md-4" style={{marginTop : "30px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576"}}>Longitutde</span>
                            <input type="number" className="form-control" style={{ fontSize:"15px" , height: "50px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend" value={longitude} required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>


                    <div className="col-md-4" style={{marginTop : "30px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576"}}>Latitude</span>
                            <input type="number" className="form-control" style={{ fontSize:"15px" , height: "50px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend" value={latitude} required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4" style={{marginTop : "30px" , marginLeft : "0px"}}>
                        <button  className="btn btn-primary" onClick={(e) => getLoc(e)} style={{fontSize : "15px" , borderRadius : "4px"}}>Get Current Co-ordinate</button>
                    </div>

                <div className="col-md-12">
                    <label for="validationCustom05" className="form-label" style={{fontSize : "20px",marginTop : "8px", color : "#5ec576"}}>Wallet Address</label>
                    <input type="text" className="form-control" id="validationCustom05" style={{height: "35px", fontSize : "18px"}} required/>
                    <div className="invalid-feedback">
                    Please provide wallet Address.
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-check" style={{marginTop : "8px"}}>
                    <input className="form-check-input" type="checkbox" style={{width: "20px" ,
    height: "20px" }} value="" id="invalidCheck" required/>
                    <label className="form-check-label" for="invalidCheck" style={{fontSize : "17px"}}>
                        &nbsp;&nbsp;&nbsp;Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">
                        You must agree before submitting.
                    </div>
                    </div>
                </div>
                <div className="col-12">
                    <button className="btns btn-primary" style={{width : "100%" , fontSize : "22px"}} type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignIn