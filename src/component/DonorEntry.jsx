import React from 'react'
import DashAside from './DashAside'
import axios from 'axios';
import { ToastContainer , toast } from 'react-toastify';
const DonorEntry = ({account , state}) => {

    const [isOpened, setIsOpened] = React.useState(false);
    var [data , setData] = React.useState({});
    const [id , setId] = React.useState({});
    const [brainDead , setBrainDead] = React.useState({});
    var [process , setProcess] = React.useState([]);


    function toggleApp() {
        setIsOpened(!isOpened);
    }

    React.useEffect(() => {
        async function getBraindead(){
            
            const {contract_nft , sign} = state;

            var datas;
            var result = [];
            console.log(contract_nft)
            if(account != '' && contract_nft != undefined){
                datas = await contract_nft.getbrainDead(account , sign)
            
                for(var i = 0 ; i < datas.length ; i++){
                    // console.log(datas[i])
                    result.push(parseInt(datas[i]));
                }
                
                if(result.length > 0)
                    getEntireDetails(result)

            }
        }

        async function getEntireDetails(result){
            
            const {contract_nft} = state;

            const datas = await contract_nft.getBrainDeadDetails(result)
            console.log(datas);

            const list = [];

            for(var i = 0 ; i < datas.length ; i++){
                console.log(datas[0][i]);
                if(datas[i][2] == '0x0000000000000000000000000000000000000000'){
                    const id = parseInt(datas[i][0]);
                    const donor_hosp = datas[i][1];
                    const d = {id};
                    const data = await axios.post("http://localhost:8000/admin/getIdDonor" , d);

                    const name = data.data.donor[0].name;
                    const json = {
                        name : name,
                        id : id,
                        success : false,
                        approval : 'Waiting'
                    }

                    list.push(json);
                }
                else{
                    const id = parseInt(datas[i][0]);
                    const donor_hosp = datas[i][1];
                    const doc1 = datas[i][2];
                    const doc2 = datas[i][3];
                    const sign1 = datas[i][6];
                    const sign2 = datas[i][7];

                    const d = {id , donor_hosp , doc1 , doc2};
                    const data = await axios.post("http://localhost:8000/admin/getEntiredDatas" , d);
                    console.log(data);
                    const name = data.data.donor[0].name;
                    const doc_1 = data.data.doc_1.name;
                    const doc_2 = data.data.doc_2.name;

                    var approval;

                    if(sign1 == 2 || sign2 == 2)
                        approval = 'Rejected';
                    else if(sign1 == 0 || sign2 == 0)
                        approval = 'Waiting';
                    else    
                        approval = 'Accepted';

                    const json = {
                        name : name,
                        id : id,
                        doc_1 : doc_1,
                        doc_2 : doc_2,
                        success : true,
                        approval,
                    }
                    list.push(json);
                }
            }

            setProcess(list);

        }

        getBraindead();
    },[isOpened , account , state])

    async function submitData(event){
        event.preventDefault();
        var d;

        console.log("Heello")

        // const da = id;

        await axios.post("http://localhost:8000/getDonor" , {id}).then((resp) => {
            console.log(resp.data.data);
            d = resp.data.data;
        });
        
        data = d;
        setData(d);
        console.log(data);
        setIsOpened(true);

    }

    function handleChange(event){
        event.preventDefault();
        setId(event.target.value);
    }

    async function submitBrainDead(id){
        try{
        console.log(id);
        const {contract_nft} = state;
        const toastId = toast.info('Transaction in Progress', { autoClose: false });
        // console.log(process.env.REACT_APP_NFTAddress);
        const val = await contract_nft.brain_Dead(id , account );
        await val.wait()
        console.log(val)
        toast.update(toastId, { render: 'Transaction Successfully', type: 'success', autoClose: 4000 });
        setTimeout(() => {
            setIsOpened(false);
        },3000);

        setTimeout(() => {
            window.location.reload(true);
        },6000)
    }
    catch(error){
        toast.error(error.revert.args[0]);
    }
    }

    function getData(){
        const id = data.id;
        return(
            <div class="card-body" >
                <h1 style={{fontWeight : "500" , marginTop:"20px" , textAlign : "center", color: "black"}} class="card-title">{data.name}</h1>
                <div style={{display : "flex" , flexDirection : "row" , marginTop : "30px" , marginLeft : "40px"}}>
                    <h2 style={{ fontSize: "18px"}}>BloodGroup :- {data.bloodgroup}</h2>
                    {data && data.hla  ? <h2 style={{marginLeft : "100px" ,  fontSize: "18px"}}>HLA :- {data.hla.toUpperCase()}</h2> : <h2 style={{marginLeft : "100px" ,  fontSize: "18px"}}>HLA :- {}</h2>}
                </div>
                <div style={{display : "flex" , flexDirection : "row" , marginTop : "30px" , marginLeft : "40px"}}>
                    <h2 style={{ fontSize: "18px"}}>Weight :- {data.weight}kg</h2>
                    <h2 style={{marginLeft : "100px" ,  fontSize: "18px"}}>Height :- {data.height}cm</h2>
                </div>
                <div style={{display : "flex" , flexDirection : "row" , marginTop : "30px" , marginLeft : "40px"}}>
                    <h2 style={{ fontSize: "18px"}}>Age :- {data.age}</h2>
                    <h2 style={{marginLeft : "60px" ,  fontSize: "18px"}}>KinContact :- {data.kincontact}</h2>
                </div>
                <div style={{display : "flex" , justifyContent : "center" , marginTop : "30px"}}>
                    <button type="submit" className = "btn btn-success" onClick={(event) => submitBrainDead(id)}>Submit</button>
                </div>
            </div>
        );
    }

      function getTableData(){
    console.log("getTableData")
    console.log("Process :-" , process)
    var num = 1;
    return process.map((data) => {
      console.log(data)
      if(data.success == false){  
      return (
          <tr style={{ fontSize : "1.5rem"}} className = "Admin">
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem"}}>{num++}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.id}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.name}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>-</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>-</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>Waiting</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.approval}</td>
          </tr>
        )
      }
      else{
        return (
        <tr style={{ fontSize : "1.5rem"}}>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem"}}>{num++}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.id}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.name}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.doc_1}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.doc_2}</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>Completed</td>
            <td style={{paddingBottom : "15px" , paddingTop : "1.5rem" }}>{data.approval}</td>
        </tr>
        )
      }
    })
  }


  return (
    <div style={{display : "flex"}}>
        <ToastContainer/>
        <DashAside account={account} style={{marginTop : "20px" , marginLeft : "50px" , width : "170px"}} />
        <div style={{width : "80%" , height : "100vh"}}> 
            <div style={{display : "flex" , marginLeft : "0px" , marginTop : "50px" , width : "100%"}}>
                <div class="card"  style={ isOpened ? {width: "45rem" , height : "30rem", boxShadow : "0 5rem 5rem var(--color-light)" , borderRadius : "30px" , margin : "20px 120px 20px 260px"} : {display : "none"}}>
                    {data ? getData()  : <div></div>}
                </div>
                <div style={ isOpened ? {display : "flex" , borderRadius : "20px" , marginTop : "60px" , height : "40px"  , border : "3px solid #5ec567" , backgroundColor : "white" , marginLeft : "50px"} : {display : "flex" , borderRadius : "20px" , marginTop : "60px" , height : "40px"  , border : "3px solid #5ec567" , backgroundColor : "white" , marginBottom : "50px" , marginLeft : "800px"}}>
                    <input type="text" name='id' onChange={(event) => handleChange(event)} style={{borderRadius : "20px" , width : "200px" , fontSize : "20px" , textIndent : "10px" , height : "35px"}} />
                    <span class="material-icons-sharp" style={{margin : "auto 0" , paddingRight : "20px" , color : "#5ec567"}} onClick={(event) => submitData(event)}>search</span>
                </div>
            </div>
            <div class="recent-orders" style={{marginLeft : "80px" , marginTop : "20px"}}>
            <table>
                <thead>
                <tr>
                    <th>Sr No.</th>
                    <th>Donor Id</th>
                    <th>Donor Name</th>
                    <th>Dcotor 1</th>
                    <th>Doctor 2</th>
                    <th>Status</th>
                    <th>Approval</th>
                </tr>
                </thead>
            <tbody>
                {getTableData()}
            </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}

export default DonorEntry