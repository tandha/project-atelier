import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProductOverview from './product_overview/overview.jsx';
import QuestionsAndAnswers from './questions_and_answers/q&a.jsx';
import RatingsAndReviews from './ratings_and_reviews/ratings&reviews.jsx';
import RelatedItemsOutfitCreation from './related_items_outfit_creation/related_items&outfit.jsx';
import { product, styles } from '../sampleData/sampleData.js';
import StarRating from './starRating.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productIsFetched: false,
      stylesAreFetched: false,
      product: {},
      styles: {},
      myOutfits: [],
      currentProductInOutfit: false,
      starRating: 0 //starRating is buggy
    };
  }

  //promise.allSettled?
  componentDidMount() {
    Promise.all([this.getProduct(64622),
      this.getStyles(64622),
      this.getOutfits()])
      .then((res) => {
        this.setState({
          product: res[0].data.data,
          productIsFetched: true,
          stylesAreFetched: true,
          styles: res[1].data.data,
          myOutfits: res[2]
        });
      })
      .then((res) => {
        if (this.state.myOutfits.includes(this.state.product.id.toString())) {
          this.setState({ currentProductInOutfit: true });
        }
      })
      .catch((err) => {
        console.log('Error Retrieving Data from Server', err);
      });
  }

  getProduct(id) {
    return axios({
      method: 'get',
      url: 'products/' + id,
    });
  }

  getStyles(id) {
    return axios({
      method: 'get',
      url: 'products/' + id + '/styles',
    });
  }

  getOutfits() {
    let localStorageOutfits = Object.keys(localStorage);
    return localStorageOutfits;
  }

  toggleOutfit(id) {
    console.log(this.state.currentProductInOutfit);
    if (!this.state.currentProductInOutfit) {
      localStorage.setItem(id, id);
      this.setState({ myOutfits: this.getOutfits(), currentProductInOutfit: true });
    } else {
      localStorage.removeItem(id, id);
      this.setState({ myOutfits: this.getOutfits(), currentProductInOutfit: false });
    }
  }

  updateStarRating(rating) {
    this.setState({ starRating: rating });
  }

  render() {
    if (!this.state.productIsFetched || !this.state.stylesAreFetched) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <ProductOverview currentProductInOutfit={this.state.currentProductInOutfit} product={this.state.product} styles={this.state.styles} starRating={<StarRating value={this.state.starRating}/>} toggleOutfit={this.toggleOutfit.bind(this)}/>
        <RelatedItemsOutfitCreation/>
        <QuestionsAndAnswers product={this.state.product}/>
        <RatingsAndReviews
          starRating={this.state.starRating}
          updateStarRating={this.updateStarRating.bind(this)}
          product={this.state.product}/>
      </div>
    );
  }
}

export default App;