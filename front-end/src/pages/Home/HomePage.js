import React, { Component } from "react";
import { Link } from "react-router-dom";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>our sory </h1>

        <Link to="/login">
          <button>login</button>
        </Link>
      </div>
    );
  }
}
export default HomePage;
