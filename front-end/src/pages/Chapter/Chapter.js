import React from "react";

class Chapter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chapter_id: this.props.match.params.chapter_id,
      chapter: null,
      topics: []
    };
  }

  // api call to get the chapter data /chapters/:chapter_id => set state chapter
  // api call to get the chapter releated topicss /chapters/:chapter_id/topics => set state topics
  getChapterInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/chapters/${this.props.match.params.chapter_id}`
      );

      const chapter = await response.json();
      //if the answer i recieve is successful
      debugger;
      this.setState({ chapter: chapter.data });
      console.log(this.state.chapter, "helllo");
    } catch (err) {
      console.log(err);
      throw new Error("fetching chapter failed");
    }
  };
  async componentDidMount() {
    this.getTopicsList();
    this.getChapterInfo();
  }

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

  render() {
    return (
      <div>
        {/* {this.state.chapter !== null ? <div>chapter data</div> : ""} */}
        {/* {this.state.topics.map()} */}
        {/* {topics.topic_id} */}
        {this.state.topics.map(item => (
          <div>{item.discription}</div>
        ))}

        <br></br>
        {this.state.chapter !== null ? (
          <div>{this.state.chapter.chapter_title}</div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Chapter;
