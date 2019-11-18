import React from "react";
import { async } from "q";

import { Link } from "react-router-dom";
class MainQuiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    disabled: true,
    isEnd: false,
    isTrue: true,
    answers: [],
    questions: this.props.questions,
    viewMode: false,
    score: 0
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true
        };
      });
    }
  }

  handleQuestionAnswer = (callback = () => {}) => {
    const { myAnswer, questions, currentQuestion, answers } = this.state;
    answers.push({
      question_id: questions[currentQuestion].question_id,
      answer: myAnswer
    });

    this.setState(
      {
        answers
      },
      () => {
        callback();
      }
    );
  };
  nextQuestionHandler = () => {
    this.handleQuestionAnswer();
    const currentQuestion = this.state.currentQuestion + 1;
    this.setState({
      myAnswer: "",
      currentQuestion
    });
  };

  finishHandler = async () => {
    this.handleQuestionAnswer(async () => {
      this.state.answers.map(answer => {
        const question = this.state.questions.find(question => {
          return answer.question_id === question.question_id;
        });

        fetch("http://localhost:8001/api/users_questions", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: 2,
            questions_question_id: answer.question_id,
            answer: answer.answer,
            status: question.answer === answer.answer
          })
        });
      });

      let score = 0;
      debugger;

      this.state.answers.map(({ answer, question_id }) => {
        const question = this.props.questions.find(
          q => q.question_id === question_id
        );
        if (question) {
          console.table([answer, question.answer]);
          debugger;

          if (question.answer === answer) {
            debugger;

            score += 1;
          }
        }
      });

      try {
        const response = await fetch(
          "http://localhost:8001/api/exams_results",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              score,
              exam_exam_id: this.props.questions[0].exam_id,
              users_ID: 2
            })
          }
        );
        const data = response.json();

        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    });
    if (this.state.currentQuestion === this.props.questions.length - 1) {
      this.setState({
        isEnd: true
      });
    }
  };

  render() {
    const { currentQuestion, isEnd, answers } = this.state;

    if (isEnd) {
      let score = 0;
      answers.map(({ answer, question_id }) => {
        const question = this.props.questions.find(
          q => q.question_id === question_id
        );
        if (question) {
          console.table([answer, question.answer]);

          if (question.answer === answer) {
            score += 1;
          }
        }
      });

      return (
        <div>
          <h3> Final score is: {score} points </h3>
          The correct answer's for the questions was
          <form>
            {this.props.questions.map((item, index) => (
              <li key={index}>{item.answer}</li>
            ))}
            <Link to="/Myprofile">
              <button>Myprofile</button>
            </Link>{" "}
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <span>
            {`Questions ${currentQuestion + 1}  out of ${
              this.props.questions.length
            } remaining `}
          </span>
          <p>
            {this.state.questions[this.state.currentQuestion].question_text}
            {this.state.questions[this.state.currentQuestion].answer}
            {this.state.myAnswer}

            {this.state.score}
          </p>
          <ul>
            <li
              onClick={() =>
                this.setState({ disabled: false, myAnswer: "options_1" })
              }
            >
              {this.state.questions[this.state.currentQuestion].options_1}
            </li>
            <li
              onClick={() =>
                this.setState({ disabled: false, myAnswer: "options_2" })
              }
            >
              {this.state.questions[this.state.currentQuestion].options_2}
            </li>
            <li
              onClick={() =>
                this.setState({ disabled: false, myAnswer: "options_3" })
              }
            >
              {this.state.questions[this.state.currentQuestion].options_3}
            </li>
          </ul>

          {currentQuestion < this.props.questions.length - 1 && (
            <button
              disabled={this.state.disabled}
              onClick={() => this.nextQuestionHandler()}
            >
              Next
            </button>
          )}

          {currentQuestion === this.props.questions.length - 1 && (
            <button onClick={this.finishHandler}>Finish</button>
          )}
        </div>
      );
    }
  }
}

export default MainQuiz;
