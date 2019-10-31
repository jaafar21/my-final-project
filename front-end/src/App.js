import React from "react";
import NavBar from "./component/navBar.js";
import { Route, Switch, withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./App.css";
import Chapter_page from "./component/Chapter_page.js";
import quizData from "./component/quizData.js";
import MainQuiz from "./component/MainQuiz.js";
import ContactPage from "./pages/Contact/ContactPage";
import Chapters from "./component/chapters.js";
import Topics from "./component/Topics.js";
import Topics_data from "./component/topics_data.js";
// import Main_topics from "./component/Topics_page";

import Exam from "./component/Chapters_exam.js";
// import Container from "./pages/Chapter_page/chapter_container";

// import Exam from "./component/Chapters_exam.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: []
    };
  }

  async componentDidMount() {
    this.getContactsList();
  }

  getContactsList = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/users");
      const answer = await response.json();
      //if the answer i recieve is successful

      this.setState({ answer: answer.data });
      console.log(this.state.answer, "bs");
    } catch (err) {
      console.log(err);
      throw new Error("fetching users failed");
    }
  };

  render() {
    return (
      <div>
        <NavBar />
        {/* <Container /> */}
        <br></br>
        <Switch>
          <Route
            path="/contactpage"
            render={() => {
              return <ContactPage />;
            }}
          />
          <Route
            path="/topics_data"
            render={props => {
              return <Topics_data {...props} />;
            }}
          />
          <Route
            path="/topics"
            render={props => {
              return <Topics {...props} />;
            }}
          />
          <Route
            path="/chapters"
            render={props => {
              return <Chapters {...props} />;
            }}
          />
          <Route
            path="/chapters/:chapter_id"
            render={props => {
              return <Chapters {...props} />;
            }}
          />
          <Route
            path="/chapters/:chapter_id/"
            render={props => {
              return <Chapters {...props} />;
            }}
          />
          {/* <Route
            path="/chapters/Topics"
            render={() => {
              return <Topics />;
            }}
          /> */}
          //***** */call clases****//
        </Switch>
        {/* {/* <Exam /> */}
        {/* <Topics /> */}
        {/* <Chapter_page /> */}
        <Exam />
        {/* <Main_topics /> */}
      </div>
    );
  }
}
export default withRouter(App);
