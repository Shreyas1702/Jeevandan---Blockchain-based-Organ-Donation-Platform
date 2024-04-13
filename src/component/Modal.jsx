import React from "react";
import axios from "axios";
import {toast} from "react-toastify"
const Modal = ({setOpen , state , tdata}) => {

    const [pic , setPic] = React.useState(false)

    var [data , setData] = React.useState("")

    const handleClose = () => {
        setOpen(false);
    };

    const handleFile = async (e) => {
        const { files } = e.target
        console.log(files[0])
        await uploadToPinata(files[0])
    }

    const failedTrans = async (req,res) => {
        const {contract , nft} = state;
        console.log(data);
        console.log(nft);
        console.log(tdata.transplant_id);
        const toastId = toast.info('Transaction in Progress', { autoClose: false });
        // const transaction = await contract.failedTrans(tdata.transplant_id , data , nft)
        // await transaction.wait();
        const id = tdata.transplant_id;
        await axios.post("http://localhost:8000/failedTrans" , {id});
        toast.update(toastId, { render: 'Transaction Successfull', type: 'success', autoClose: 3000 });
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
                
                toast.update(toastId, { render: 'Document Uploaded Successfully', type: 'success', autoClose: 3000 });

                setPic(true);
            }
            catch(error){
                console.log(error)
                toast.error("Unable to Upload the Image");
            }
            console.log(ImgHash)
            setData(ImgHash);
        }
    };
 
    return (
       <div style={{position : "absolute" , backgroundColor : "white" , zIndex : "1" , width : "600px" , height : "400px" , border : "1px solid black" , top : "300px" , left : "37%"}}>
           <span class="material-icons-sharp" onClick={handleClose} style={{display : "flex" , flexDirection : "row-reverse" , padding : "15px 15px 0px 15px"}}> close </span>
           <h1 style={{marginTop : "5px" , color : "#5ec567" , textAlign : "center" , fontWeight : "500"}}>Transplant Failed</h1>
           <p style={{ textAlign : "center" , marginTop : "30px"}}>Please upload the report stating the reason behind transplantation process failure</p>
            <div className="col-md-8" style={{position : "relative" , margin : "40px auto 20px auto"}}>
                <input type="file"  name="link" class="form-control form-control-lg" onChange={(event) => handleFile(event)} id="formFileLg" />             
            </div>
            {pic && <p style={{fontSize : "15px" , textAlign : "center" , color : "#5ec576" , margin : "0px" , padding : "0px"}}>{data.slice(0,30) + "....." + data.slice(50,80)}</p>}

            <button className="col-md-6" onClick={(event) => failedTrans(event)} type="submit" style={{padding : "15px" , backgroundColor : "#5ec567" , color : "white" , fontSize : "17px" , borderRadius : "5px" , margin : "20px 150px 20px 150px"}}>Submit</button>
       </div>
    );
};
 
export default Modal;