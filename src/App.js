import "./index.css";
import { useState } from "react";
import Footer from "./component/Footer";
import SignIn from "./component/SignIn";
import LandingPage from "./component/LandingPage";
import { GiHamburgerMenu } from "react-icons/gi";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Web3 from "web3";

function App() {
  const [state, setState] = new useState(false);

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
