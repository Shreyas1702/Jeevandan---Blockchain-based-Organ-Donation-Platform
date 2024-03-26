import React from 'react'
import Aside from './Aside'
import axios from 'axios';
const RecieverCard = ({account}) => {
    const [data , setData] = React.useState([]);

    React.useEffect(() => {
        async function getData(){
            var dd;
            try{
                await axios.post("http://localhost:8000/admin//getReciever" , data).then((response) => {
                    console.log(response);

                    dd =  response.data;
                })
            }
            catch(e){
                console.log(e);
            }

            return dd;
        }

        setTimeout(async () => {
            const d = await getData();
            console.log(d.donor)
            setData(d.donor);
        })
    }, []);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getTableData(){
    console.log("getTableData")
    console.log("Process :-" , data)

    return data.map((data) => {
      var list = [];
      const ids = data.transplant_id;  
      list.push('[');
      for(var i = 0 ; i < data.organs.length ; i++){
          const capitalizedString = capitalizeFirstLetter(data.organs[i]);
          list.push(capitalizedString);
          list.push(' , ');
      }

      list.pop();
      list.push(']');
      return (
          <div class="card" style={{width: "45rem" , height : "43rem", boxShadow : "0 5rem 5rem var(--color-light)" , borderRadius : "30px" , margin : "20px auto"}}>
                <div class="card-body" >
                    <h1 style={{fontWeight : "500" , marginTop:"20px" , textAlign : "center"}} class="card-title">{data.name}</h1>
                    <h2 style={{fontSize: "18px" , marginTop:"20px" , textAlign : "center"}} class="card-title">Email :- {data.email}</h2>
                    <h2 style={{fontSize: "18px" , marginTop:"20px" , marginLeft : "40px" }} class="card-title">Wallet Address :- {data.meta_address.slice(0 , 22)}<br></br><span style={{marginLeft : "90px"}}>{data.meta_address.slice(23)}</span></h2>
                    <div style={{display : "flex" , flexDirection : "row" , marginTop : "25px" , marginLeft : "40px"}}>
                        <h2 style={{ fontSize: "18px"}}>BloodGroup :- {data.bloodgroup}</h2>
                        <h2 style={{marginLeft : "100px" ,  fontSize: "18px"}}>HLA :- {data.hla.toUpperCase()}</h2>
                    </div>
                    <div style={{display : "flex" , flexDirection : "row" , marginTop : "25px" , marginLeft : "40px"}}>
                        <h2 style={{ fontSize: "18px"}}>Weight :- {data.weight}kg</h2>
                        <h2 style={{marginLeft : "100px" ,  fontSize: "18px"}}>Height :- {data.height}cm</h2>
                    </div>
                    <div style={{display : "flex" , flexDirection : "row" , marginTop : "25px" , marginLeft : "40px"}}>
                        <h2 style={{ fontSize: "18px"}}>Age :- {data.age}</h2>
                        <h2 style={{marginLeft : "60px" ,  fontSize: "18px"}}>KinContact :- {data.contact}</h2>
                    </div>
                    <div style={{display : "flex" , flexDirection : "row" , marginTop : "25px" , justifyContent: "center"}}>
                        <h2 style={{ fontSize: "18px"}}>Organs Need:- {list}</h2>
                    </div>
                    <div style={{display : "flex" , justifyContent : "center" , marginTop : "25px"}}>
                        <button type="submit" className = "btn btn-success"> <a href={data.link}>Check Report</a></button>
                    </div>
                </div>
            </div>
        )
    })
  }
  return (
    <div style={{display : "flex"}}>
        <Aside account={account} style={{marginTop : "60px" , marginLeft : "50px" , width : "80%"}}/>
        <div style={{marginTop:"40px" , width : "70%" , display: "flex" , flexWrap : "wrap" , justifyContent : "center" , height : "100vh" , marginRight : "10px" , marginLeft : "100px"}}>
            {getTableData()}          
        </div>
    </div>
  )
}

export default RecieverCard