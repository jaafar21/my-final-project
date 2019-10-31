import React from "react";
import {Topics} from "./Topics.js"
class Main_topics extends React.Component {
  state = {
    currentTopic: 0,
    Topic : [],
    mytopic: [],
    disabled: true,
    isEnd: false,
    
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentTopic !== prevState.currentTopic) {
      this.setState(() => {
        return {
          disabled: true,
          Topic: Topics[this.state.currentTopic].Topic,
        };
      });
    }
  }
    componentDidMount() {
    this.loadTopic();
  }
  nextTopicHandler = () => {
    // console.log('test')
    const { mytopic, Topic } = this.state;

    if (mytopic === Topic) {
      let Topic = this.state.Topic + 1;
     
      this.setState({
        Topic,
        mytopic: ""
      });
      let currentTopic = this.state.currentTopic + 1;
    this.setState({
      currentTopic
    });
  };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.currentTopic !== prevState.currentTopic) {
//       this.setState(() => {
//         return {
//           disabled: true,
//           Topic: Topics[this.state.currentTopic].Topic
//        };
//       });
//     }
//   }
  
   checkTopic = Topic => {
    this.setState({ mytopic: Topic, disabled: false });
  };
  finishHandler = () => {
    const { mytopic, Topic } = this.state;

    // if (myAnswer === answer) {
    //   let score = this.state.score + 1;
    //   console.log(score);
    //   this.setState({
    //     score,
    //     myAnswer: ""
    //   });
    // }
    if (this.state.currentTopic === Topic.length - 1) {
      this.setState({
        isEnd: true
      });
    }
  };
   render() {
    console.log(this.state);
    const { Topic, mytopic, currentTopic, isEnd } = this.state;

    if (isEnd) {
      return (
        <div className="result">
          <p>
            <ul>
              {Topics.map((item, index) => (
                <li key={index}>{item.Topics}</li>
              ))}
            </ul>
          </p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>{this.state.Topic} </h1>
          
              onClick={() => this.checkTopic(Topic)}
            >
              {Topic}
            
          ))}
          {currentTopic < Topics.length - 1 && (
            <button
              className="ui inverted button"
              disabled={this.state.disabled}
              onClick={() => this.nextTopicHandler()}
            >
              Next
            </button>
          )}
          {/* //adding a finish button */}
          {currentTopic === Topic.length - 1 && (
            <button className="ui inverted button" onClick={this.finishHandler}>
              Finish
            </button>
          )}
        </div>
      );
    }
   }}}
export default Main_topics;