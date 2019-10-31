import React, { Component } from "react";
import MainQuiz from "./MainQuiz.js";
// import { Link } from "react-router-dom";
// import { isTemplateElement } from "@babel/types";
class Exam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Exams: [],
      viewMode: false
    };
  }

  async componentDidMount() {
    this.getContactsList();
  }

  getContactsList = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/questions");
      const Exams = await response.json();
      //if the answer i recieve is successful

      this.setState({ Exams: Exams.data });
      console.log(this.state.Exams, "bs");
    } catch (err) {
      console.log(err);
      throw new Error("fetching users failed");
    }
  };
  render() {
    return (
      <div>
        <button
          onClick={() => this.setState({ viewMode: !this.state.viewMode })}
        >
          View Exam
        </button>
        {this.state.viewMode ? <MainQuiz /> : null}
        <div>
          {this.state.Exams.map(item => (
            <div>
              <br></br>
              <br></br>
              <h1>chapters_exam</h1>
              {item.question_text}
              {item.answer}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Exam;
