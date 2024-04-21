// require("dotenv").config();

import "./index.css";
import abi from "./contracts/register.json";
import abis from "./contracts/NFT.json";
import abil from "./contracts/LivingDonor.json";
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
import DonorEntry from "./component/DonorEntry";
import DoctorPage from "./component/DoctorPage";
import TransferNFT from "./component/TransferNFT";
import LivingDonate from "./component/LivingDonate";
import LivingTransplant from "./component/LivingTransplant";
import FailedTrans from "./component/FailedTrans";
import LiveTracking from "./component/LiveTracking";
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
      const contractAddress = process.env.REACT_APP_SignAddress;
      const contractABI = abi.abi;

      const contractAddress_NFT = process.env.REACT_APP_NFTAddress;
      const contractABI_NFT = abis.abi;

      const contractAddress_living = process.env.REACT_APP_Living;
      const contractABI_living = abil.abi;

      const nft = process.env.REACT_APP_NFTAddress;
      const living = process.env.REACT_APP_Living;
      const sign = process.env.REACT_APP_SignAddress;

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

        const contract_living = await new ethers.Contract(
          contractAddress_living,
          contractABI_living,
          signer
        );

        console.log(await signer.getAddress());
        console.log("contract");
        setState({
          provider,
          signer,
          contract,
          contract_nft,
          contract_living,
          sign,
          nft,
          living,
        });
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
            path="/dashboard"
            element={
              <Dashboard
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
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
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
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
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
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
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
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
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
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          ></Route>
          <Route
            path="/transferNFt"
            element={
              <TransferNFT
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
            path="/dashboard/living"
            element={
              <LivingDonate
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
            path="/hospitalPage/Timeline"
            element={
              <TimeLine
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
            path="/dashboard/approval"
            element={
              <DonorEntry
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
            path="/doctor"
            element={
              <DoctorPage
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
            path="/failed"
            element={
              <FailedTrans
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
            path="/dashbaord/living/TransplantPage"
            element={
              <LivingTransplant
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
            path="/dashbaord/live_tracking"
            element={
              <LiveTracking
                account={account}
                setAccount={setAccount}
                state={state}
                setState={setState}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
