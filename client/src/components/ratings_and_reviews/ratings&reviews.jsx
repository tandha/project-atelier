import React from 'react';
import axios from 'axios';
import Breakdown from './rating-breakdown/breakdown.jsx';
import List from './reviews-list/list.jsx';

class RatingsAndReview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentFilter: 'all',
      reviews: []
    };
    this.placeHolderID = 64621;
  }

  // Commented out for later use:

  // componentDidMount() {
  //   this.getReviews();
  // }
  // getReviews() {
  //   axios({
  //     method: 'get',
  //     baseURL: 'http://127.0.0.1:3000',
  //     url: '/reviews',
  //     params: {
  //       'page': 1,
  //       'count': 100000,
  //       'sort': 'newest',
  //       'product_id': this.placeHolderID
  //     }
  //   }).then((response) => this.setState({ reviews: response.data }))
  //     .catch((err) => console.log(err));
  // }

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
          productID={this.props.productID}/>
        <List />
      </div>
    );
  }
}

export default RatingsAndReview;