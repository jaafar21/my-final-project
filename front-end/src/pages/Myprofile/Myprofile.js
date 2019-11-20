import React, { Component } from "react";
import { importDeclaration } from "@babel/types";
import images1 from "./images1.jpg";
import "./myprofile.css";
import { wrap } from "module";
class Myprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: [],
      exams_results: [],
      chapter: []
      //   exam_exam_id: this.props.match.params.exam_exam_id
    };
  }

  async componentDidMount() {
    this.getScoreResult();
  }
  // componentWillReceiveProps(new_props) {
  //   // console.log(Object.keys(new_props), "here");
  //   this.setState({
  //     chapter: Object.keys(new_props)
  //   });
  //   console.log(this.state.chapter.chapter_title, "hehhhhhhhh");
  // }

  getScoreResult = async () => {
    try {
      const response = await fetch(`http://localhost:8001/api/exams_results`);
      const score = await response.json();

      this.setState({ score: score.data });
      console.log(this.state.score, "bs");
    } catch (err) {
      console.log(err);
      throw new Error("fetching result failed");
    }
  };

  render() {
    return (
      <div>
        <img className="mylogo" src={images1} />
        <div
          style={{
            textAlign: "center",
            margin: "auto",
            backgroundColor: "purple",
            height: 200,
            width: 200,
            borderRadius: 100,
            marginBottom: 10
          }}
        >
          <h2 style={{ textAlign: "center", paddingTop: 80 }}>
            The score is : 25
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: wrap,
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <button>Exam 1</button>

          <button>Exam 2</button>
          <button>Exam 3</button>
        </div>
        <div className="result-container">
          {this.state.score.map(item => (
            <div className="grid-item">
              <h1 className="result-title">
                {" "}
                you got in: {item.date}
                <h2> ("{item.score}") points</h2>
              </h1>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Myprofile;
