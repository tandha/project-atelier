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
      starRating: 0 //starRating is buggy
    };
  }

  componentDidMount() {
    Promise.all([this.getProduct(64622),
      this.getStyles(64622),
      this.getOutfits(64622)])
      .then((res) => {
        this.setState({
          product: res[0].data.data,
          productIsFetched: true,
          stylesAreFetched: true,
          styles: res[1].data.data,
          myOutfits: res[2].data
        });
      })
      .then((res) => {
        if (this.state.myOutfits.includes(this.state.product.id)) {
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

  getOutfits(id) {
    return axios({
      method: 'get',
      url: 'outfits',
    });
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