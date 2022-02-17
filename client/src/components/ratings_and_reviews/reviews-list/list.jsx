import React from 'react';
import Sort from './sort.jsx';
import Tile from './tile.jsx';
import Buttons from './buttons.jsx';
import axios from 'axios';

class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      displayedReviews: [],
      listLength: 2,
      listMaxed: false,
      currentSort: 'relevant',
    };
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    axios({
      method: 'get',
      url: '/reviews',
      params: {
        'page': 1,
        'count': 100000,
        'sort': this.state.currentSort,
        'product_id': this.props.productID
      }
    }).then((response) => {
      this.setState({ reviews: response.data.data.results }, () => {
        this.updateDisplayedReviews();
      });
    })
      .catch((err) => console.log(err));
  }

  updateDisplayedReviews() {
    let displayedReviews = this.state.reviews.slice(0, this.state.listLength);
    let listMaxed;
    displayedReviews.length >= this.state.reviews.length ? listMaxed = true : listMaxed = false;
    this.setState({ displayedReviews, listMaxed });
  }

  updateSort(sort) {
    this.setState({ currentSort: sort }, () => this.getReviews());
  }

  updateLength() {
    let newLength = this.state.listLength + 2;
    this.setState({ listLength: newLength }, () => this.updateDisplayedReviews());
  }

  render() {
    return (
      <div id='review-list'>
        <Sort updateSort={this.updateSort.bind(this)} numReviews={this.state.reviews.length}/>

        <div id='review-tiles'>
          {this.state.displayedReviews.map((review, index) => {
            return <Tile key={index} review={review} />;
          })}
        </div>

        <Buttons updateLength={this.updateLength.bind(this)} listMaxed={this.state.listMaxed}/>
      </div>)
    ;
  }
}

export default List;