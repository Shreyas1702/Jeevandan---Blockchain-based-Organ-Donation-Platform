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

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x19d31d971e1c4ab9C296ffdaa1785C1ED46fb1fD";
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
              {!loggedIn && (
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
            </ul>
          </div>
        </div>
  )
}

export default Navbar