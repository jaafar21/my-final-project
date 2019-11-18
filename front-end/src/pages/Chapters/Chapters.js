import React, { Component } from "react";
import "./chapters_page.css";
import { Link } from "react-router-dom";

class Chapters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: [],
      Chapterbyid: ""
    };
  }

  async componentDidMount() {
    this.getChaptersList();
  }

  getChaptersList = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/chapters");
      const chapters = await response.json();
      //if the answer i recieve is successful

      this.setState({ chapters: chapters.data });
      console.log(this.state.chapters, "bs");
    } catch (err) {
      console.log(err);
      throw new Error("fetching chapters failed");
    }
  };

  getChapterById = async id => {
    try {
      const response = await fetch(`http://localhost:8001/api/chapters/${id}`);
      const chapter = await response.json();
      //if the answer i recieve is successful
      console.log("c", chapter.data.chapter_id);
      this.props.history.push({
        pathname: "/topics",
        state: { chapter: chapter.data.chapter_id }
      });
    } catch (err) {
      console.log(err);
      throw new Error("fetching users failed");
    }
  };
  render() {
    return (
      <div>
        <div className="chapters_container">
          {this.state.chapters.map(chapter => (
            <Link to={`/chapters/${chapter.chapter_id}`}>
              <div>
                <h3 className="chapters_title">{chapter.chapter_title}</h3>
              </div>
              <div>
                <img
                  className="chapters_image"
                  src={`http://localhost:8001/${chapter.chapter_image}`}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
export default Chapters;
