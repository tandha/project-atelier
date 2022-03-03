import React from 'react';
import Sort from './sort.jsx';
import Tile from './tile.jsx';
import Buttons from './buttons.jsx';
import NewReview from './newReview.jsx';
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
      currentFilter: [],
      renderModal: false,
      currentID: 64620
    };
  }

  componentDidMount() {
    this.getReviews(false);
  }

  componentDidUpdate() {
    if (this.state.currentFilter.length !== this.props.currentFilter.length) {
      let newFilter = this.props.currentFilter.slice();
      this.setState({ currentFilter: newFilter }, () => {
        this.updateDisplayedReviews(false);
      });
    }
    if (this.props.productID !== this.state.currentID) {
      this.setState({ currentID: this.props.productID }, () => {
        this.getReviews(false);
      });
    }
  }

  getReviews(scroll) {
    axios({
      method: 'get',
      url: '/reviews',
      params: {
        'page': 1,
        'count': 100000,
        'sort': this.state.currentSort,
        'product_id': this.state.currentID
      }
    }).then((response) => {
      this.setState({ reviews: response.data.data.results }, () => {
        this.updateDisplayedReviews(scroll);
      });
    })
      .catch((err) => console.log(err));
  }

  updateDisplayedReviews(scroll) {
    let displayedReviews = [];
    let listMaxed;
    let currentFilter = this.state.currentFilter;
    let reviews = this.state.reviews;

    if (currentFilter.length === 0) {
      displayedReviews = reviews.slice(0, this.state.listLength);
      displayedReviews.length >= reviews.length ? listMaxed = true : listMaxed = false;
      if (scroll) {
        this.setState({ displayedReviews, listMaxed }, () => document.getElementById('review-list-buttons').scrollIntoView());
      } else {
        this.setState({ displayedReviews, listMaxed });
      }
    } else {
      reviews.forEach(review => {
        if (currentFilter.includes(review.rating.toString())) {
          displayedReviews.push(review);
        }
      });
      displayedReviews = displayedReviews.slice(0, this.state.listLength);
      displayedReviews.length >= reviews.length ? listMaxed = true : listMaxed = false;
      if (scroll) {
        this.setState({ displayedReviews, listMaxed }, () => document.getElementById('review-list-buttons').scrollIntoView());
      } else {
        this.setState({ displayedReviews, listMaxed });
      }
    }
  }

  updateSort(sort) {
    this.setState({ currentSort: sort }, () => this.getReviews());
  }

  updateLength(scroll) {
    let newLength = this.state.listLength + 2;
    this.setState({ listLength: newLength }, () => this.updateDisplayedReviews(scroll));
  }

  displayModal() {
    this.setState({ renderModal: true });
  }

  hideModal() {
    this.setState({ renderModal: false });
  }

  render() {
    return (
      <div id='review-list'>
        <Sort updateSort={this.updateSort.bind(this)}
          numReviews={this.state.reviews.length}/>

        <div id='review-tiles'>
          {this.state.displayedReviews.map((review, index) => {
            return <Tile key={index} review={review} />;
          })}
        </div>

        <Buttons updateLength={this.updateLength.bind(this)}
          listMaxed={this.state.listMaxed}
          displayModal={this.displayModal.bind(this)}/>

        {this.state.renderModal
          ? <NewReview product={this.props.product}
            chars={this.props.chars}
            getReviews={this.getReviews.bind(this)}
            hideModal={this.hideModal.bind(this)}/>
          : null}

      </div>)
    ;
  }
}

export default List;