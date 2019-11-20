import React, { Component } from "react";
import Myprofile from "../pages/Myprofile/Myprofile";

import { Link } from "react-router-dom";
// import Topics from "./Topics.js";
// import MainQuiz from "./MainQuiz.js";

class Chapters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: [],
      Chapterbyid: ""
    };
  }

  async componentDidMount() {
    this.getTopicsList();
  }

  getTopicsList = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/chapters");
      const chapter = await response.json();
      //if the answer i recieve is successful

      this.setState({ chapter: chapter.data });
      console.log(this.state.chapter, "bs");
    } catch (err) {
      console.log(err);
      throw new Error("fetching users failed");
    }
  };

  getItemById = async id => {
    try {
      const response = await fetch(`http://localhost:8001/api/chapters/${id}`);
      const chapter = await response.json();
      //if the answer i recieve is successful
      console.log("c", chapter.data.chapter_id);
      this.props.history.push({
        pathname: "/topics",
        state: { chapter: chapter.data.chapter_id }
      });
    } catch (err) {
      console.log(err);
      throw new Error("fetching users failed");
    }
  };
  render() {
    return (
      <div>
        <div>
          {this.state.chapter.map(item => (
            <button onClick={() => this.getItemById(item.chapter_id)}>
              {item.chapter_title}
            </button>
          ))}
        </div>
        <Myprofile chapter={this.state.chapter} />
      </div>
    );
  }
}
export default Chapters;
