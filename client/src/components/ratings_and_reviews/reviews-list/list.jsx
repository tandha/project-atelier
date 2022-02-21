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
      renderModal: true
    };
  }

  componentDidMount() {
    this.getReviews();
  }

  componentDidUpdate() {
    if (this.state.currentFilter.length !== this.props.currentFilter.length) {
      let newFilter = this.props.currentFilter.slice();
      this.setState({ currentFilter: newFilter }, () => {
        this.updateDisplayedReviews();
      });
    }
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
    let displayedReviews = [];
    let listMaxed;
    let currentFilter = this.state.currentFilter;
    let reviews = this.state.reviews;

    if (currentFilter.length === 0) {
      displayedReviews = reviews.slice(0, this.state.listLength);
      displayedReviews.length >= reviews.length ? listMaxed = true : listMaxed = false;
      this.setState({ displayedReviews, listMaxed });

    } else {
      reviews.forEach(review => {
        if (currentFilter.includes(review.rating.toString())) {
          displayedReviews.push(review);
        }
      });
      displayedReviews = displayedReviews.slice(0, this.state.listLength);
      displayedReviews.length >= reviews.length ? listMaxed = true : listMaxed = false;
      this.setState({ displayedReviews, listMaxed });
    }
  }

  updateSort(sort) {
    this.setState({ currentSort: sort }, () => this.getReviews());
  }

  updateLength() {
    let newLength = this.state.listLength + 2;
    this.setState({ listLength: newLength }, () => this.updateDisplayedReviews());
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

        {this.state.renderModal ? <NewReview product={this.props.product}/> : <div></div>}

      </div>)
    ;
  }
}

export default List;