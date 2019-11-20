import React from "react";
import NavBar from "./component/navBar.js";
import { Route, Switch, withRouter } from "react-router";
import { Link } from "react-router-dom";
import "./App.css";
import Main_topics from "./component/Topics_page";
import Myprofile from "./pages/Myprofile/Myprofile.js";

import Ourstory from "./pages/ourstory/ContactPage";
import HomePage from "./pages/Home/HomePage";

import Chapters from "./pages/Chapters/Chapters.js";
import Topics from "./component/Topics.js";
import Topics_data from "./component/topics_data.js";
// import Main_topics from "./component/Topics_page";

import LogIn from "./pages/logInPage/logIn.js";
import SingUp from "./pages/singup_page/singUp";

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
            path="/Myprofile"
            render={() => {
              return <Myprofile />;
            }}
          />
          <Route
            path="/Ourstory"
            render={() => {
              return <Ourstory />;
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
            exact
            render={props => {
              return <Chapters {...props} />;
            }}
          />
          <Route
            path="/chapters/:chapter_id"
            render={props => {
              return <Main_topics {...props} />;
            }}
          />
          <Route
            path="/home"
            exact={true}
            render={props => {
              return <HomePage {...props} />;
            }}
          />
          <Route
            path="/login"
            render={props => {
              return <LogIn {...props} />;
            }}
          />
          <Route
            path="/singUp"
            render={props => {
              return <SingUp {...props} />;
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
        {/* <Exam /> */}
        {/* <MainQuiz /> */}

        {/* <Main_topics /> */}
      </div>
    );
  }
}
export default withRouter(App);
