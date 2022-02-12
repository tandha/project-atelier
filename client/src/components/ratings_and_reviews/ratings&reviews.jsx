import React from 'react';
import axios from 'axios';
import Breakdown from './rating-breakdown/breakdown.jsx';
import List from './reviews-list/list.jsx';

class RatingsAndReview extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentFilter: 'all'
    };
  }

  componentDidMount() {
    let dummyRating = 3.5;
    this.props.updateStarRating(3.5);
  }

  updateFilter(filter) {
    this.setState({ currentFilter: filter });
  }

  render() {
    return (
      <div id="ratings-and-reviews">
        <Breakdown
          starRating={this.props.starRating}
          updateFilter={this.updateFilter.bind(this)}/>
        <List />
      </div>
    );
  }
}

export default RatingsAndReview;