import React from 'react';
import Breakdown from './rating-breakdown/breakdown.jsx';
import List from './reviews-list/list.jsx';

class RatingsAndReview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: 'all'
    };
    this.placeHolderID = 64631;
  }

  updateFilter(filter) {
    this.setState({ currentFilter: filter });
  }

  render() {
    return (
      <div id="ratings-and-reviews">
        <Breakdown
          starRating={this.props.starRating}
          updateStarRating={this.props.updateStarRating}
          updateFilter={this.updateFilter.bind(this)}
          productID={this.placeHolderID}
        />
        <List
          productID={this.placeHolderID}
          currentFilter={this.props.currentFilter}
        />
      </div>
    );
  }
}

export default RatingsAndReview;