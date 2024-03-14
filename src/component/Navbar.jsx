import React from 'react'
import { ethers } from "ethers";
import abi from "./../contracts/register.json";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("");
  const [func, setFunc] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x65e5Fc36c3D8906CD25c358cF892d8fE1389Fb7A";
      const contractABI = abi.abi;

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
        console.log(await signer.getAddress());
        console.log("contract");
        setState({ provider, signer, contract });
        console.log(contract);
        console.log(accounts[0]);

        const transaction = await contract.check(accounts[0]);
        console.log(transaction);
        if (transaction) {
          setLoggedIn(true);
          console.log(loggedIn);
        }
        console.log(account)
        if(account == "0x87804696f85bef5801fe3e0cabf2392a7a1e26dd"){
          setAdmin(true);
          setLoggedIn(false)
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
    <div className="navbar">
          <div className="heading">
            <h2>
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
              {console.log(loggedIn)}
              {!loggedIn && !admin && (
                <li>
                  <a className="my_links" href="/signin">
                    Register
                  </a>
                </li>
              )}
              {loggedIn && (
                <li>
                  <a className="my_links" href="/dashboard">
                    DashBoard
                  </a>
                </li>
              )}
              {admin && (
                <li>
                  <a className="my_links" href="/dashboard_admin">
                    DashBoard
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
  )
}

export default Navbar