import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import Select from "react-select";
import DashAside from './DashAside';
import { toast , ToastContainer} from 'react-toastify';

const ReceiverForm = ({ account, setAccount , state ,setState}) => {
  const options = [
        { value: "kidney", label: "Kidney" },
        { value: "pancreas", label: "Pancreas" },
        { value: "liver", label: "Liver" },
    ];

    const option = [
        { value: 1, label: "First" },
        { value: 2, label: "Second" },
        { value: 3, label: "Third" },
        { value: 4, label: "Fourth" },

    ];

    const [data , setData] = useState({
        address : "",
        name : "",
        weight : 0,
        height : 0,
        hla : "",
        link:"",
        email : "",
        bloodgroup:"",
        organs: [],
        nftId: 0,
        age:0,
        meta_address: "",
        contact : 0,
        seriouness : 0,
        flag : false
    })

    const [skills, setSkills] = useState([]);

    const [serious, setSerious] = useState([]);


    const handleChanges = (serious) => {
        setSkills(serious || []);
    };

    const handleChangeSerious = (skills) => {
        setSerious(skills || []);
    };


    const [status , setStatus] = useState(false);

    const [pic , setPic] = useState(false)

    const SubmitForm = async (e) => {
        e.preventDefault();
        console.log(account);
        data.seriouness = serious.value;
        console.log(data);
        for(let i = 0 ; i < skills.length ; i++){
            data.organs.push(skills[i].value);
            console.log(skills[i].value)
        }
        data.flag = status;

        const humanData = {
            "name" : data.name,
            "weight" : data.weight,
            "height" : data.height,
            "hla" : data.hla,
            "link" : data.link,
            "organ" : "",
            "image" : "",
            "email" : data.email,
            "age" : data.age,
            "contact" : data.contact,
            "bloodgroup" : data.bloodgroup,
            "address" : account,
        }

        humanData.image = "https://gateway.pinata.cloud/ipfs/QmPQvvpRgEYDfkB1xe7gJYTaD1iNgJczEjbCRbtTt6S5Au"
        const d = await uploadToPinataJson(humanData);
        const toastId = toast.info('Creating NFT', { autoClose: false });
        const resp = `https://gateway.pinata.cloud/ipfs/${d.data.IpfsHash}`
        var num = await contractCall(resp)
        data.nftId = num;
        toast.update(toastId, { render: 'NFT Created Successfully', type: 'success', autoClose: 3000 });
        
        try{
        const {contract}  = state;
        console.log(contract)
        console.log(data);
        data.address = account
        const transaction = await contract.registerReceive(data.address ,  data.hla  , data.bloodgroup  , data.organs , data.flag);
        const toastId = toast.info('Transaction in Progress', { autoClose: false });
        const rc = await transaction.wait();
        console.log("Transaction Done");
        console.log(account);
        var Id = await contract.getRecieverId();
        Id = parseInt(Id.toString())
        console.log(Id)
        console.log(data);

        await axios.post(`http://localhost:8000/reciever_reg/${Id}`, data)
        .then(function (response) {
            console.log(response);
            toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 5000 });
        })
        .catch(function (error) {
            console.log(error);
            toast.error(error);
        });
        }
         catch (error) {
        toast.error(error);
    }

    setTimeout(() => {
        window.location.reload(true);
    },6000);


  }

    const contractCall = async (resp) => {
        const {contract_nft}  = state;
        console.log(resp)
        const transaction = await contract_nft.awardItem(data.meta_address , resp);
        const rc = await transaction.wait();
        var num = parseInt(rc.logs[1].data.toString())
        return num
    }

    const check = async (e) => {
        setStatus(current => !current);
    }

    const handleFile = async (e) => {
        const { files } = e.target
        console.log(files[0])
        await uploadToPinata(files[0])
    }

    const uploadToPinata = async (file) => {
        console.log("hello");
        console.log(file)
        if(file){
            let ImgHash;
            try {
                const formData = new FormData();
                formData.append("file" , file);

                const toastId = toast.info('Uploading in Progress', { autoClose: false });

                const response = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data : formData,
                    headers : {
                        pinata_api_key : `403a4001d5cc63b3ce0f`,
                        pinata_secret_api_key : `cd44bc63c6fdbabc149ce19412cc7c049d2ee4e5477ce8e9f824ef323a8a0c30`,
                        "Content-Type" : "multipart/form-data",
                    },
                });

                ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

                setPic(true)

                toast.update(toastId, { render: 'Document Uploaded Successfully', type: 'success', autoClose: 3000 });

            }
            catch(error){
                console.log(error)
                console.log("Unable to Upload the Image")
            }

            data.link = ImgHash;

            console.log(data)
            
        }
    };

    const uploadToPinataJson = async (humanData) => {
      
      const data = humanData;

      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        headers: {
          pinata_api_key: `403a4001d5cc63b3ce0f`,
          pinata_secret_api_key: `cd44bc63c6fdbabc149ce19412cc7c049d2ee4e5477ce8e9f824ef323a8a0c30`,
          "Content-Type": "application/json",
        },
      });

      return response;
    }

    function handleChange(e){
        console.log(e.target.name)
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
        <div style={{display : "flex"}}>
        <ToastContainer />
        <DashAside account={account} style={{marginTop : "20px" , marginLeft : "50px" , width : "170px"}} />
        <div className="donor-reg-form" style={{marginLeft : "280px"}}>
            <h1 style={{marginLeft : "300px" , marginBottom : "25px" , marginTop : "30px" , color : "#5ec567"}}>Reciever Registration Form</h1>
            <div className='donor-register' style={{width:"80%"}}>
                <form class="row g-3 needs-validation" encType="multipart/form-data" novalidate>
                    <div className="col-md-12" style={{marginTop : "10px",marginLeft : "10px"}}>
                        <label for="validationCustom01" className="form-label" style={{fontSize : "20px", color : "#5ec576"}}>Name</label>
                        <input name='name' type="text" className="form-control" onChange={(event) => handleChange(event)} style={{height: "35px" , fontSize : "18px"}} id="validationCustom01" required/>
                        <div className="valid-feedback">
                        Looks good!
                        </div>
                    </div>

                    <div className="col-md-12" style={{marginTop : "30px" , marginLeft : "10px"}}>
                        <label for="formFileLg" class="form-label" style={{fontSize : "20px", color : "#5ec576"}}>Report </label>
                            <input type="file"  name="link" class="form-control form-control-lg" onChange={(event) => handleFile(event)} id="formFileLg" />             
                            {pic && <p style={{fontSize : "15px" , color : "#5ec576" , margin : "0px" , padding : "0px"}}>{data.link}</p>}
                    </div>

                    <div className="col-md-5" style={{marginTop : "50px",marginLeft:"10px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576" , backgroundColor : "#5ec576" , color : "white"}}>User Address</span>
                            <input name='meta_address' type="text" min="1" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "43px" , width: "60px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend"  required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5" style={{marginTop : "50px",marginLeft:"120px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576" , backgroundColor : "#5ec576" , color : "white"}}>Email</span>
                            <input name='email' type="email" min="1" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "43px" , width: "60px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend"  required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3" style={{marginTop : "50px" , marginLeft : "10px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , backgroundColor : "#5ec576" , color : "white"}}>Weight (kg)</span>
                            <input name='weight' type="number" min="1" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "45px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend"  required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>


                    <div className="col-md-3" style={{marginTop : "50px",marginLeft:"96px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576" , backgroundColor : "#5ec576" , color : "white"}}>Height (cm)</span>
                            <input name='height' type="number" min="1" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "43px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend"  required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3" style={{marginTop : "50px",marginLeft:"90px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576" , backgroundColor : "#5ec576" , color : "white"}}>Age</span>
                            <input name='age' type="number" min="1" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "43px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend"  required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>

                    <div class="input-group mb-1" style={{height : "30px" , width : "40%" , marginLeft : "10px" , marginTop : "50px"}}>
                        <label class="input-group-text" style={{ fontSize : "18px" , backgroundColor : "#5ec576" , color : "white"}} for="inputGroupSelect01">Blood Group</label>
                        <select class="form-select" name="bloodgroup" id="inputGroupSelect01" onChange={(event) => handleChange(event)} style={{ fontSize : "18px"}}>
                            <option selected>Select</option>
							<option value="O+">O+</option>
							<option value="O-">O-</option>
							<option value="A+">A+</option>
							<option value="A-">A-</option>
							<option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>

                    <div class="input-group mb-1" style={{height : "30px" , width : "40%" , marginLeft : "145px" , marginTop : "50px"}}>
                        <label class="input-group-text" style={{ fontSize : "18px" , backgroundColor : "#5ec576" , color : "white"}} for="inputGroupSelect01">HLA-Type</label>
                        <select class="form-select" onChange={(event) => handleChange(event)} name="hla" id="inputGroupSelect01" style={{ fontSize : "18px"}}>
                            <option selected>Select</option>
							<option value="hla-a">HLA-A</option>
							<option value="hla-b">HLA-B</option>
							<option value="hla-c">HLA-C</option>
							<option value="hla-dp">HLA-DP</option>
							<option value="hla-dq">HLA-DQ</option>
                            <option value="hla-dr">HLA-DR</option>
                        </select>
                    </div>

                    <Select
                    options={options}
                    onChange= {handleChanges}
                    value={skills}
                    style={{ fontSize : "18px" , backgroundColor : "#5ec576" , color : "white" , height : "30px"}}
                    isMulti
                    />

                    <Select
                    options={option}
                    name="serious"
                    onChange= {handleChangeSerious}
                    value={serious}
                    style={{ fontSize : "18px" , backgroundColor : "#5ec576" , color : "white" , height : "30px"}}
                    className = "select-items"
                    />

                    <div className="col-md-12" style={{marginTop : "50px",marginLeft:"10px"}}>
                        <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{fontSize : "18px" , color : "#5ec576" , backgroundColor : "#5ec576" , color : "white"}}>Kin Contact</span>
                            <input name='contact' type="number" min="1" onChange={(event) => handleChange(event)} className="form-control" style={{ fontSize:"15px" , height: "43px" , width: "60px" }} id="validationCustomUsername" aria-describedby="inputGroupPrepend"  required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>

                    <div className="col-12" style={{marginLeft : "10px" , marginTop : "30px"}}>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onClick={(event) => check(event)} style={{border : "1px solid #5ec576" , color : "#5ec576" , width : '35px' , height : "17px"}}/>
                            <label class="form-check-label" for="flexSwitchCheckChecked" style={{fontSize : "15px" , marginLeft : "15px"}}>Accepted</label>
                        </div>
                    </div>
                    <div className="col-12" style={{marginTop : "20px"}}>
                        <button className="btns btn-primary" style={{fontSize : "22px" , width : "100%"}} type="submit" onClick={(event) => SubmitForm(event)}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default ReceiverForm