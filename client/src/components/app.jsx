import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProductOverview from './product_overview/overview.jsx';
import QuestionsAndAnswers from './questions_and_answers/q&a.jsx';
import RatingsAndReviews from './ratings_and_reviews/ratings&reviews.jsx';
import RelatedItemsOutfitCreation from './related_items_outfit_creation/related_items&outfit.jsx';
import { product, styles } from '../sampleData/sampleData.js';

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
      starRating: 0
    };
  }


  componentDidMount() {
    this.getProduct(64622);
    this.getStyles(64622);
    this.getOutfits();
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

  getOutfits(id) {
    axios({
      method: 'get',
      url: 'outfits',
    }).then((res) => {
      this.setState({ myOutfits: res.data });
    }).then(() => {
      if (!this.state.myOutfits.includes(this.state.product.id)) {
        this.setState({currentProductInOutfit: false });
      }
    }).catch((err) => { console.log('An error occured retrieving outfit data from server', err); });
  }

  toggleOutfit(id) {
    if (!this.state.currentProductInOutfit) {
      axios({
        method: 'post',
        url: 'outfits',
        data: {
          id: id
        }
      }).then(() => {
        this.setState({ currentProductInOutfit: true });
      }).then((res) => {
        this.getOutfits(id);
      }).catch((err) => { console.log('An error occured adding outfit data to server', err); });

    } else {
      axios({
        method: 'delete',
        url: 'outfits',
        data: {
          id: id
        }
      }).then(() => {
        this.setState({ currentProductInOutfit: false });
      }).then((res) => {
        this.getOutfits(id);
      }).catch((err) => { console.log('An error occured adding outfit data to server', err); });
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
        <ProductOverview currentProductInOutfit={this.state.currentProductInOutfit} product={this.state.product} styles={this.state.styles} starRating={this.state.starRating} toggleOutfit={this.toggleOutfit.bind(this)}/>
        <RelatedItemsOutfitCreation/>
        <QuestionsAndAnswers product={this.state.product}/>
        <RatingsAndReviews
          starRating={this.state.starRating}
          updateStarRating={this.updateStarRating.bind(this)}/>
      </div>
    );
  }
}

export default App;