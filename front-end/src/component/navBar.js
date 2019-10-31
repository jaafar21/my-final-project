import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "./navBar.css";
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
          <ul>
            <Link to="/home">
              <li>HOME</li>
            </Link>
            <Link to="/contactpage">
              <li>contact</li>
              <Link to="/chapters">
              <li>chapters</li>
            </Link>
            </Link>
          </ul>
        </nav>
      </div>
    );
  }
}

export default navBar;
