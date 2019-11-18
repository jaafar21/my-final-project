// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// class LogIn extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return (
//       <div>
//         <h1>welcom To Our Website</h1>
//         <div></div>
//       </div>
//     );
//   }
// }
// export default LogIn;
import React, { Component } from "react";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      error: ""
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log("here", event);
    const { username, password, email } = this.state;
    fetch("http://localhost:8001/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        Username1: username,
        Password1: password,
        email: email
      })
    })
      .then(response => response.json())
      .then(data => {
        const { success, message } = data;
        console.log("successss", data);
        if (success) {
          this.props.history.push("/");
        } else {
          this.setState({
            error: message
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: err
        });
      });
  };
  dismissError() {
    this.setState({ error: "" });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: "Username is required" });
    }

    if (!this.state.password) {
      return this.setState({ error: "Password is required" });
    }

    return this.setState({ error: "" });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value
    });
  }

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)
    const { username, password, email } = this.state;
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {this.state.error && (
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          )}
          <label>User Name</label>
          <input
            type="text"
            data-test="username"
            value={this.state.username}
            onChange={this.handleUserChange}
          />

          <label>Password</label>
          <input
            type="password"
            data-test="password"
            value={this.state.password}
            onChange={this.handlePassChange}
          />

          <input type="submit" value="Log In" data-test="submit" />
        </form>
      </div>
    );
  }
}

export default LogIn;
