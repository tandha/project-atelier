import React from 'react';
import Breakdown from './rating-breakdown/breakdown.jsx';
import List from './reviews-list/list.jsx';

class RatingsAndReview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: [],
      chars: {}
    };
  }

  updateChars(chars) {
    this.setState({ chars });
  }

  updateFilter(rating) {
    if (rating === '0') {
      this.setState({ currentFilter: [] });
      return;
    }

    let currentFilter = this.state.currentFilter;
    if (currentFilter.includes(rating)) {
      let index = currentFilter.indexOf(rating);
      currentFilter.splice(index, 1);
    } else {
      currentFilter.push(rating);
    }
    currentFilter.sort();
    this.setState({ currentFilter });
  }

  render() {
    return (
      <React.Fragment>
        <div id='rr-title'>RATINGS & REVIEWS</div>
        <div id="ratings-and-reviews">
          <Breakdown
            starRating={this.props.starRating}
            updateStarRating={this.props.updateStarRating}
            updateFilter={this.updateFilter.bind(this)}
            productID={this.props.product.id}
            currentFilter={this.state.currentFilter}
            updateChars={this.updateChars.bind(this)}
          />
          <List
            productID={this.props.product.id}
            currentFilter={this.state.currentFilter}
            product={this.props.product}
            chars={this.state.chars}
          />
        </div>
      </React.Fragment>

    );
  }
}

export default RatingsAndReview;