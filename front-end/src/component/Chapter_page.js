import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Topics from "./Topics.js";

class Chapters_page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Chapters_page: []
    };
  }

  async componentDidMount() {
    this.getContactsList();
  }

  getContactsList = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/chapters");
      const Chapters_page = await response.json();
      //if the answer i recieve is successful

      this.setState({ Chapters_page: Chapters_page.data });
      console.log(this.state.Chapters_page, "bs");
    } catch (err) {
      console.log(err);
      throw new Error("fetching users failed");
    }
  };
  render() {
    return (
      <div>
        <div>
          {this.state.Chapters_page.map(item => (
            <div>
              <br></br>
              <br></br>
              <h1> chapter_page</h1>
              {item.status}
              <br></br>
              {item.chapter_id}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Chapters_page;
