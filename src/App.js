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

  const [account, setAccount] = useState("");
  const [func, setFunc] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xcdeb021ae6EF488eA41a71C8B25CCb1a14986B4C";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
        }

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(await signer.getAddress());
        console.log(contract);
        const transaction = await contract.check(account);
        if (transaction) {
        }

        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
      setFunc(false);
    };

    connectWallet();
  }, [func]);

  function btnhandler() {
    if (window.ethereum) {
      console.log("hello");
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        setAccount(res[0]);
        setFunc(true);
      });
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
                {account ? (
                  <button
                    type="button"
                    className="connectbtn"
                    style={{ backgroundColor: "#5ec576", color: "white" }}
                  >
                    {account.slice(0, 4) + "...." + account.slice(38, 42)}
                  </button>
                ) : (
                  <button onClick={() => btnhandler()} className="connectbtn">
                    Connect
                  </button>
                )}
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
          <Route
            path="/signin"
            element={
              <SignIn
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
