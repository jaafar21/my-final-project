import React, { Component } from "react";
import { Link } from "react-router-dom";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>our sory: </h1>
        <p>
          Chemistry is at the centre of everything you can see, smell, touch and
          taste. Whether studying the chemistry of life, or developing the
          advanced science behind modern technology, chemical scientists use
          their expertise to improve our health, our environment and our daily
          lives. Collaboration is essential. We connect scientists with each
          other and society as a whole, so they can do their best work and make
          discoveries and innovation happen. We publish new research. We
          develop, recognise and celebrate professional capabilities. We bring
          people together to spark new ideas and new partnerships. We support
          teachers to inspire future generations of scientists. And we speak up
          to influence the people making decisions that affect us all. We are a
          catalyst for the chemistry that enriches our world.
        </p>

        <Link to="/login">
          <button>login</button>
        </Link>
      </div>
    );
  }
}
export default HomePage;
