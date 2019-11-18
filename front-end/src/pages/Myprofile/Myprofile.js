import React, { Component } from "react";

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
        <ul>
          {this.state.score.map(item => (
            <div>
              <p>in : {this.state.chapter.map(item => item.chapter_title)}</p>
              <h4>
                {" "}
                in this date :{item.date} <br></br>your score is :{" "}
              </h4>{" "}
              ("{item.score}")<br></br>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
export default Myprofile;
