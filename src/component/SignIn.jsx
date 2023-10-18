import React from 'react'

const SignIn = () => {
  return (
    <div className="hosp-reg-form">
        <div className='hosp-register'>
            <form class="row g-3 needs-validation" novalidate>
                <div class="col-md-12">
                    <label for="validationCustom01" class="form-label" style={{fontSize : "20px", color : "#5ec576"}}>Hospital Name</label>
                    <input type="text" class="form-control" style={{height: "35px" , fontSize : "18px"}} id="validationCustom01" required/>
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-12">
                    <label for="validationCustom02" class="form-label" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}} >Hospital Id</label>
                    <input type="text" class="form-control" id="validationCustom02" style={{height: "35px" , fontSize : "18px"}} required/>
                    <div class="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div class="col-md-12">
                    <label for="validationCustomUsername" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}} class="form-label">Email</label>
                    <div class="input-group has-validation">
                    <input type="text" class="form-control" id="validationCustomUsername" style={{height: "35px" , fontSize : "18px"}} aria-describedby="inputGroupPrepend" required/>
                    <div class="invalid-feedback">
                        Please choose a username.
                    </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom03" class="form-label" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}}>City</label>
                    <input type="text" class="form-control" id="validationCustom03" style={{height: "35px", fontSize : "18px"}} required/>
                    <div class="invalid-feedback">
                    Please provide a valid city.
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationCustom04" class="form-label" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}}>State</label>
                    <select class="form-select" id="validationCustom04" style={{height: "35px", fontSize : "18px"}} required>
                    <option selected disabled value="">Choose...</option>
                    <option>Maharastra</option>
                    <option>Gujarat</option>
                    <option>Rajasthan</option>
                    <option>Kerala</option>
                    <option>Karnataka</option>
                    <option>Uttar Pradesh</option>
                    </select>
                    <div class="invalid-feedback">
                    Please select a valid state.
                    </div>
                </div>
                <div class="col-md-12">
                    <label for="validationCustom05" class="form-label" style={{fontSize : "20px",marginTop : "8px", color : "#5ec576"}}>Address</label>
                    <textarea type="text" class="form-control" id="validationCustom05" style={{height: "35px", fontSize : "16px"}} required/>
                    <div class="invalid-feedback">
                    Please provide a valid Address.
                    </div>
                </div>
                <div class="col-md-12">
                    <label for="validationCustom05" class="form-label" style={{fontSize : "20px",marginTop : "8px", color : "#5ec576"}}>Wallet Address</label>
                    <input type="text" class="form-control" id="validationCustom05" style={{height: "35px", fontSize : "18px"}} required/>
                    <div class="invalid-feedback">
                    Please provide wallet Address.
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-check" style={{marginTop : "8px"}}>
                    <input class="form-check-input" type="checkbox" style={{width: "20px" ,
    height: "20px" }} value="" id="invalidCheck" required/>
                    <label class="form-check-label" for="invalidCheck" style={{fontSize : "17px"}}>
                        &nbsp;&nbsp;&nbsp;Agree to terms and conditions
                    </label>
                    <div class="invalid-feedback">
                        You must agree before submitting.
                    </div>
                    </div>
                </div>
                <div class="col-12">
                    <button class="btns btn-primary" style={{width : "100%" , fontSize : "22px"}} type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignIn