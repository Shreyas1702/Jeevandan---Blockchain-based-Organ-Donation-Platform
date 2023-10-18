import logo from "./logo.svg";
import "./index.css";
import Footer from "./component/Footer";
import SignIn from "./component/SignIn";
import LandingPage from "./component/LandingPage";
import { GiHamburgerMenu } from "react-icons/gi";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
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
              <hr className="horizontal" />
              <li>
                <a className="my_links" href="/">
                  Connect
                </a>
              </li>
              <hr className="horizontal" />
              <li>
                <a className="my_links" href="/signin">
                  Sign In
                </a>
              </li>
              <hr className="horizontal" />
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
