import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProductOverview from './product_overview/overview.jsx';
import QuestionsAndAnswers from './questions_and_answers/q&a.jsx';
import RatingsAndReviews from './ratings_and_reviews/ratings&reviews.jsx';
import RelatedItemsOutfitCreation from './related_items_outfit_creation/related_items&outfit.jsx';
import { product, styles } from '../sampleData/sampleData.js';
import InteractionsWrapper from './interactions.jsx';

const WrappedRatingsAndReviews = InteractionsWrapper(RatingsAndReviews);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productIsFetched: false,
      stylesAreFetched: false,
      product: {},
      styles: {},
      myOutfits: [],
      starRating: 0
    };
  }


  componentDidMount() {
    this.getProduct(64622);
    this.getStyles(64622);
  }

  getProduct(id) {
    axios({
      method: 'get',
      url: 'products/' + id,
    }).then((res) => {
      this.setState({ product: res.data.data, productIsFetched: true });
    }).catch((err) => { console.log('An error occured retrieving product data from server', err); });
  }

  getStyles(id) {
    axios({
      method: 'get',
      url: 'products/' + id + '/styles',
    }).then((res) => {
      this.setState({ styles: res.data.data, stylesAreFetched: true });
    }).catch((err) => { console.log('An error occured retrieving style data from server', err); });
  }

  addToMyOutfit(id) {
    let myOutfits = this.state.myOutfits;
    myOutfits.push(id);
    this.setState({ myOutfits: myOutfits });
  }

  removeFromMyOutfit(id) {
    let index = this.state.myOutfits.indexOf(id);
    let myOutfits = this.state.myOutfits;
    myOutfits.splice(index, 1);
    this.setState({ myOutfits: myOutfits });
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
        <ProductOverview product={this.state.product} styles={this.state.styles} starRating={this.state.starRating} addToMyOutfit={this.addToMyOutfit.bind(this)}/>
        <RelatedItemsOutfitCreation/>
        <QuestionsAndAnswers product={this.state.product}/>
        <WrappedRatingsAndReviews
          starRating={this.state.starRating}
          updateStarRating={this.updateStarRating.bind(this)}
          product={this.state.product}/>
      </div>
    );
  }
}

export default App;