import React from "react";
import { Topics } from "./Topics.js";
import Exam from "./Chapters_exam.js";
import MainQuiz from "./MainQuiz.js";

class Main_topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter_id: this.props.match.params.chapter_id,
      chapter: null,
      currentTopic: 0,
      topics: [],
      disabled: true,
      isEnd: false
      // isTrue: true
    };
  }

  async componentDidMount() {
    this.getTopicsList();
    this.getChapterInfo();
  }

  getChapterInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/chapters/${this.props.match.params.chapter_id}`
      );

      const chapter = await response.json();
      //if the answer i recieve is successful

      this.setState({ chapter: chapter.data });
      console.log(this.state.chapter, "helllo");
    } catch (err) {
      console.log(err);
      throw new Error("fetching chapter failed");
    }
  };

  getTopicsList = async () => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/chapters/${this.state.chapter_id}/topics`
      );

      console.log(this.state.chapter_id);
      const topics = await response.json();
      //if the answer i recieve is successful

      this.setState({ topics: topics.data });
      console.log(this.state.topics, "TOPICS");
    } catch (err) {
      console.log(err);
      throw new Error("fetching Topics failed");
    }
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.currentTopic !== prevState.currentTopic) {
  //     this.setState(() => {
  //       return {
  //         disabled: true,
  //         topics: this.state.topics[this.state.currentTopic].Topic
  //       };
  //     });
  //   }
  // }

  nextTopicHandler = () => {
    const { mytopic, topics } = this.state;

    let currentTopic = this.state.currentTopic + 1;
    this.setState({
      currentTopic
    });
  };

  finishHandler = () => {
    if (this.state.currentTopic === this.state.topics.length - 1) {
      this.setState({
        isEnd: true
      });
    }
  };

  render() {
    const { topics, currentTopic, isEnd } = this.state;
    const myTopic = this.state.topics[currentTopic];
    const ChapterInfo = chapter => {
      return <>{chapter !== null ? <div>{chapter.chapter_title}</div> : ""}</>;
    };
    console.log("topics", topics, currentTopic);
    if (isEnd) {
      return (
        <div>
          {this.props.match.params.chapter_id}
          <ChapterInfo chapter={this.state.chapter} />
          <Exam chapter_id={this.props.match.params.chapter_id} />
        </div>
      );
    } else {
      return (
        <div>
          <ChapterInfo chapter={this.state.chapter} />

          {myTopic !== undefined ? (
            <div>
              <div>
                {" "}
                <img
                  width="200px"
                  height="100px"
                  src={`http://localhost:8001/${myTopic.image}`}
                />
              </div>{" "}
              {myTopic.discription}
            </div>
          ) : (
            "ss"
          )}
          {currentTopic < topics.length - 1 ? (
            <button onClick={() => this.nextTopicHandler()}>Next</button>
          ) : (
            <button onClick={this.finishHandler}>exam</button>
          )}
        </div>
      );
    }
  }
}

export default Main_topics;
