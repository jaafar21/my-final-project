// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { isTemplateElement } from "@babel/types";
// import "./topics_data";
// import { async } from "q";
// class Topics extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       Topic: [],
//       topicbyid: ""
//     };
//   }
//   componentWillReceiveProps(props) {
//     console.log("here", props);
//   }
//   async componentDidMount() {
//     console.log("here", this.props.location.state.chapter);
//     this.getTopicsList(this.props.location.state.chapter);
//     //const { ...props } = this.props;
//     // this.getTopi   csList(props.match.params.id);
//     // console.log("hi", props.match.params.id);
//   }

//   getTopicsList = async id => {
//     try {
//       const response = await fetch(
//         "http://localhost:8001/api/chapters/:chapter_id/topics/"
//       );
//       const Topic = await response.json();
//       //if the answer i recieve is successful

//       this.setState({ Topic: Topic.data });
//       console.log(this.state.Topic, "bs");
//     } catch (err) {
//       console.log(err);
//       throw new Error("fetching users failed");
//     }
//   };
//   getItemById = async id => {
//     try {
//       const response = await fetch(`http://localhost:8001/api/topics/${id}`);
//       const Topic = await response.json();
//       //if the answer i recieve is successful

//       this.props.history.push({
//         pathname: "/topics_data",
//         state: { topic: Topic.data }
//       });
//     } catch (err) {
//       console.log(err);
//       throw new Error("fetching users failed");
//     }
//   };
//   render() {
//     // console.log("hi", props.match.params.id);
//     return (
//       <div>
//         <h1>from topic.js</h1>
//         <div>
//           {this.state.Topic.map(item => (
//             <button onClick={() => this.getItemById(item.topic_id)}>
//               {item.title}
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }
// export default Topics;
import React, { Component } from "react";

import { Link } from "react-router-dom";
// import Topics from "./Topics.js";
// import MainQuiz from "./MainQuiz.js";

class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Topic: [],
      topicbyid: ""
    };
  }

  async componentDidMount() {
    this.getTopicsList();
  }

  getTopicsList = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/chapters");
      const Topic = await response.json();
      //if the answer i recieve is successful

      this.setState({ Topic: Topic.data });
      console.log(this.state.Topic, "bs");
    } catch (err) {
      console.log(err);
      throw new Error("fetching users failed");
    }
  };
  getItemById = async id => {
    try {
      const response = await fetch(`http://localhost:8001/api/topics`);
      const Topic = await response.json();
      //if the answer i recieve is successful
      console.log("c", Topic.data.topic_id);
      this.props.history.push({
        pathname: "/topics",
        state: { Topic: Topic.data.topic_id }
      });
    } catch (err) {
      console.log(err);
      throw new Error("fetching users failed");
    }
  };
  render() {
    return (
      <div>
        <h1>topicssssssss</h1>

        <div>
          {this.state.Topic.map(item => (
            <button onClick={() => this.getItemById(item.Topic_id)}>
              {item.topic_id}
              {item.image}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
export default Topics;
