import React from 'react';
import axios from 'axios';
import Breakdown from './rating-breakdown/breakdown.jsx';
import List from './reviews-list/list.jsx';
const url = 'http://127.0.0.1:3000';

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

    axios({
      method: 'get',
      url: `${url}/reviews`,
      params: {
        'page': 1,
        'count': 100000,
        'sort': 'newest',
        'product_id': 64621
      }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
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