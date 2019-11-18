import React, { Component } from "react";

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div class="all">
          <div class="lefter">
            <div class="text">Hosting</div>
          </div>
          <div class="left">
            <div class="text">Web Design</div>
          </div>
          <div class="center">
            <div class="explainer">
              <span>Hover me</span>
            </div>
            <div class="text">Frontend Development</div>
          </div>
          <div class="right">
            <div class="text">Backend Development</div>
          </div>
          <div class="righter">
            <div class="text">SEO</div>
          </div>
        </div>

        <a href="" target="_blank" class="ref">
          🔗 Jouan Marcel
        </a>
      </div>
    );
  }
}
export default AboutUs;
