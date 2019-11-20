import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "./navBar.css";
import images1 from "../pages/Myprofile/images1.jpg";
// import { BurgerIcon } from './'

class navBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  render() {
    return (
      <div className="logo">
        <nav>
          <img className="mylogo" src={images1} />
          <ul>
            <Link to="/home">
              <li className="HOME">HOME</li>
            </Link>
            <Link to="/singUp">
              <li className="SIGNUP">signUp</li>
            </Link>
            <Link to="/logIn">
              <li className="LOGIN">logIn</li>
            </Link>
            <Link to="/Myprofile">
              <li className="MYPROFILE">Myprofile</li>
            </Link>
            <Link to="/contactpage">
              {/* <li className="CONTACTPAGE">contact</li> */}

              <Link to="/chapters">
                <li className="CHAPTERS ">chapters</li>
              </Link>
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}

export default navBar;
