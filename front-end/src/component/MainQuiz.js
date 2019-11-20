import React from "react";
import { async } from "q";
import "./mainquiz.css";
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
        <div className="final-report">
          <h3> Final score is: {score} points </h3>
          <Link to="/Myprofile">
            <button className="mypofile-button">Myprofile</button>
          </Link>{" "}
        </div>
      );
    } else {
      return (
        <div className="container-exam">
          <span className="remaining-guestion">
            {`Questions ${currentQuestion + 1}  out of ${
              this.props.questions.length
            }  `}
          </span>
          <div>
            <h2 className="exam_title"> please select one option</h2>
            <p className="questions_text">
              {this.state.questions[this.state.currentQuestion].question_text}{" "}
              ?:
              {/* {this.state.questions[this.state.currentQuestion].answer} */}
              {/* {this.state.myAnswer} */}
              {/* {this.state.score} */}
            </p>
            <form className="questions_form">
              <ol
                onClick={() =>
                  this.setState({ disabled: false, myAnswer: "options_1" })
                }
              >
                1: {this.state.questions[this.state.currentQuestion].options_1}
              </ol>
              <ol
                onClick={() =>
                  this.setState({ disabled: false, myAnswer: "options_2" })
                }
              >
                2: {this.state.questions[this.state.currentQuestion].options_2}
              </ol>
              <ol
                onClick={() =>
                  this.setState({ disabled: false, myAnswer: "options_3" })
                }
              >
                3:
                {this.state.questions[this.state.currentQuestion].options_3}
              </ol>
            </form>
          </div>
          <div></div>
          {currentQuestion < this.props.questions.length - 1 && (
            <button
              className="next_but"
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
