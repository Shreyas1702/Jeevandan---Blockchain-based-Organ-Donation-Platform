import "./index.css";
import abi from "./contracts/register.json";
import abis from "./contracts/NFT.json";
import { useState, useEffect } from "react";
import SignIn from "./component/SignIn";
import LandingPage from "./component/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Web3 from "web3";
import { ethers } from "ethers";
import HospitalPage from "./component/HospitalPage";
import DonorForm from "./component/DonorForm";
import Matching from "./component/Matching";
import ReceiverForm from "./component/ReceiverForm";
import Transplant from "./component/Transplant";
import TimeLine from "./component/TimeLine";
import Dashboard from "./component/Dashboard";
import DashAdmin from "./component/DashAdmin";
import DonorCard from "./component/DonorCard";
import RecieverCard from "./component/RecieverCard";
import TransAdmin from "./component/TransAdmin";
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("");
  const [func, setFunc] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x65e5Fc36c3D8906CD25c358cF892d8fE1389Fb7A";
      const contractABI = abi.abi;

      const contractAddress_NFT = "0x5BbE9441E0b9DdF0197702a5Ab8bd55eB36670a0";
      const contractABI_NFT = abis.abi;

      try {
        const { ethereum } = window;

        console.group(ethereum);

        var accounts;
        if (ethereum) {
          accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });

          console.log(accounts[0]);
          await setAccount(accounts[0]);
          console.log(account);
        }

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = await new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const contract_nft = await new ethers.Contract(
          contractAddress_NFT,
          contractABI_NFT,
          signer
        );

        console.log(await signer.getAddress());
        console.log("contract");
        setState({ provider, signer, contract, contract_nft });
        console.log(contract);
        console.log(accounts[0]);

        const transaction = await contract.check(accounts[0]);
        console.log(transaction);
        if (transaction) {
          setLoggedIn(true);
          console.log(loggedIn);
        }
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
      });
      setFunc(true);
    } else {
      alert("install metamask extension!!");
    }
  }

  return (
    <div className="App">
      <BrowserRouter className="nav">
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          ></Route>
          <Route
            path="/dashboard_admin"
            element={
              <DashAdmin
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          ></Route>
          <Route
            path="/dashboard_admin/donors"
            element={
              <DonorCard
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          ></Route>
          <Route
            path="/dashboard_admin/reciever"
            element={
              <RecieverCard
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          ></Route>
          <Route
            path="/dashboard_admin/transAdmin"
            element={
              <TransAdmin
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <SignIn
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          ></Route>
          {loggedIn && (
            <Route
              path="/hospitalPage"
              element={
                <HospitalPage
                  account={account}
                  setAccount={setAccount}
                  state={state}
                  setState={setState}
                />
              }
            ></Route>
          )}
          <Route
            path="/dashboard/DonorForm"
            element={
              <DonorForm
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
              />
            }
          ></Route>
          <Route
            path="/dashboard/ReceiverForm"
            element={
              <ReceiverForm
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
              />
            }
          ></Route>
          <Route
            path="/dashboard/MatchingPage"
            element={
              <Matching
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
              />
            }
          ></Route>
          <Route
            path="/dashboard/TransplantPage"
            element={
              <Transplant
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
              />
            }
          ></Route>
          <Route
            path="/hospitalPage/Timeline"
            element={
              <TimeLine
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
              />
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <Dashboard
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
