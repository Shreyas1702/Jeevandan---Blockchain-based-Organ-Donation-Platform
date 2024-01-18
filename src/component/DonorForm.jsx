import React from 'react'
import { useState } from 'react';
const DonorForm = () => {

    const [data , setData] = useState({
        name : "",
        weight : 0,
        height : 0,
        hla : "",
        link:"",
        bloodgroup:"",
        organs:"",
        age:0,
        kincontact : 0,
        a : "",
    })

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
        <div className="donor-reg-form">
            <div className='donor-register'>
                <form class="row g-3 needs-validation" novalidate>
                    <div className="col-md-12" style={{marginTop : "50px",marginLeft : "20%",width:"60%"}}>
                        <label for="validationCustom01" className="form-label" style={{fontSize : "20px", color : "#5ec576"}}>Name</label>
                        <input name='name' type="text" className="form-control" onChange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}} id="validationCustom01" required/>
                        <div className="valid-feedback">
                        Looks good!
                        </div>
                    </div>

                   

                    <div className="col-md-12" style={{marginTop : "50px",marginLeft : "20%",width:"60%"}}>
                        <label for="validationCustomUsername" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}} className="form-label">Email</label>
                        <div className="input-group has-validation">
                        <input name='email' type="text" className="form-control" id="validationCustomUsername" onChange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}} aria-describedby="inputGroupPrepend" required/>
                        <div className="invalid-feedback">
                            Please choose a username.
                        </div>
                        </div>
                    </div>                    
                        <div className="col-md-2" style={{marginTop : "50px",marginLeft : "20%"}}>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576"}}>Weight(kg)</span>
                                <input name='weight' type="number" min="1" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "50px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend"  required/>
                                <div className="invalid-feedback">
                                    Please choose a username.
                                </div>
                            </div>
                        </div>
    
    
                        <div className="col-md-2" style={{marginTop : "50px",marginLeft:"5%"}}>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576"}}>Height(cm)</span>
                                <input name='height' type="number" min="1" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "50px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend"  required/>
                                <div className="invalid-feedback">
                                    Please choose a username.
                                </div>
                            </div>
                        </div>

                    <div className="col-md-2" style={{marginTop : "50px",marginLeft:"5%"}}>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576"}}>AGE</span>
                                <input name='weight' type="number" min="1" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "50px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend"  required/>
                                <div className="invalid-feedback">
                                    Please choose a username.
                                </div>
                            </div>
                        </div>


                    <div className="col-md-2" style={{marginTop : "50px",marginLeft:"20%"}}>
                    <label for="validationCustom02" className="form-label" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}}>BloodGroup</label>
						<select name="bloodgroup" class="hla" onchange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}}>
							<option selected>SELECT</option>
							<option value="O+">O+</option>
							<option value="O-">O-</option>
							<option value="A+">A+</option>
							<option value="A-">A-</option>
							<option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
						</select>
                        <div className="valid-feedback">
                        Looks good!
                        </div>
                        </div>



                        <div className="col-md-2" style={{marginTop : "50px",marginLeft:"8%"}}>
                    <label for="validationCustom02" className="form-label" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}} >Hla</label>
						<select name="hla" class="hla" onchange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}}>
							<option selected>SELECT</option>
							<option value="hla-a">HLA-A</option>
							<option value="hla-b">HLA-B</option>
							<option value="hla-c">HLA-C</option>
							<option value="hla-dp">HLA-DP</option>
							<option value="hla-dq">HLA-DQ</option>
                            <option value="hla-dr">HLA-DR</option>
						</select>
                        <div className="valid-feedback">
                        Looks good!
                        </div>
                    </div>



                    <div className="col-md-2" style={{marginTop : "50px",marginLeft:"3.5%"}}>
                    <label for="validationCustom02" className="form-label" style={{fontSize : "20px" , marginTop : "8px", color : "#5ec576"}} >Select Organ</label>
						<select name="hla" class="hla" onchange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}}>
							<option selected>SELECT</option>
							<option value="kidney">Kidney</option>
							<option value="liver">Liver</option>
                            <option value="pancreas">Pancreas</option>

						</select>
                        <div className="valid-feedback">
                        Looks good!
                        </div>
                    </div>

                    <div className="col-md-4" style={{marginTop : "50px" , marginLeft : "20%"}}>
                        <label for="formFileLg" class="form-label">CHOOSE YOUR DONOR CETIFICATE </label>
                            <input type="file" name="link" class="form-control form-control-lg" id="formFileLg" />             
                        </div>


                    <div className="col-12">
                        <div className="form-check" style={{marginTop : "8px",marginLeft:"20%"}}>
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
                        <button className="btns btn-primary" style={{width : "60%" , fontSize : "22px",marginLeft:"20%"}} type="submit" onClick="">Submit</button>
                    </div>
                </form>
            </div>
        </div>
      )






  
}


export default DonorForm