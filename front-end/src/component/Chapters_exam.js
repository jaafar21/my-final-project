import React, { Component } from "react";
import MainQuiz from "./MainQuiz.js";

class Exam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      viewMode: false
    };
  }

  async componentDidMount() {
    this.getExamQuestions(this.props.chapter_id);
  }

  getExamQuestions = async chapter_id => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/chapters/${chapter_id}/exams`
      );
      const questions = await response.json();
      //if the answer i recieve is successful
      console.log("questions", questions);
      this.setState({ questions: questions.data });
      console.log(this.state.questions, "bs");
    } catch (err) {
      debugger;
      console.log(err);
      throw new Error("fetching exam questions failed");
    }
  };
  render() {
    return (
      <div>
        <button
          onClick={() => this.setState({ viewMode: !this.state.viewMode })}
        >
          START EXAM
        </button>
        {this.state.viewMode ? (
          <MainQuiz questions={this.state.questions} />
        ) : null}
      </div>
    );
  }
}
export default Exam;
