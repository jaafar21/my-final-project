import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isTemplateElement } from "@babel/types";

class Topics_data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Topic: [this.props.location.state.topic]
    };
  }

  //   async componentDidMount() {
  //     this.getTopicsList();
  //   }

  //   getTopicsList = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8001/api/topics");
  //       const Topic = await response.json();
  //       //if the answer i recieve is successful

  //       this.setState({ Topic: Topic.data });
  //       console.log(this.state.Topic, "bs");
  //     } catch (err) {
  //       console.log(err);
  //       throw new Error("fetching users failed");
  //     }
  //   };
  render() {
    console.log("==", this.props);
    return (
      <div>
        <div>
          {this.state.Topic.map(item => (
            <div>
              <br></br>
              <br></br>
              {item.title}
              <br></br>
              {item.discription}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Topics_data;
