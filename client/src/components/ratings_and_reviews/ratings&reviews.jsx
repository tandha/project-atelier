import React from 'react';
import axios from 'axios';

class RatingsAndReview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let dummyRating = 3.5;
    this.props.updateStarRating(3.5);
  }

  render() {
    return (
      <div>{this.props.starRating}</div>
    );
  }
}

export default RatingsAndReview;