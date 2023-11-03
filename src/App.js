import "./index.css";
import abi from "./contracts/enterDetails.json";
import { useState, useEffect } from "react";
import SignIn from "./component/SignIn";
import LandingPage from "./component/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import { ethers } from "ethers";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
        }

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  console.log(state);

  function btnhandler() {
    if (window.ethereum) {
      console.log("hello");
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => console.log(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  }

  return (
    <div className="App">
      <BrowserRouter className="nav">
        <div className="navbar">
          <div className="heading">
            <h2>
              {" "}
              <span style={{ color: "#5ec576" }}>Jeeva</span>ndan
            </h2>
          </div>
          <div className="links">
            <ul>
              <li>
                <a className="my_links" href="/">
                  Home
                </a>
              </li>
              <li>
                <button onClick={() => btnhandler()} className="connectbtn">
                  Connect
                </button>
              </li>
              <li>
                <a className="my_links" href="/signin">
                  Register
                </a>
              </li>
              <li>
                <a className="my_links" href="/">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
