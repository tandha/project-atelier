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
      product: {},
      styles: {},
      myOutfits: [],
      starRating: 0
    };
  }

  componentDidMount() {
    this.getProduct();
    this.getStyles();
    this.addToMyOutfit('1');
    this.removeFromMyOutfit('1');
  }

  getProduct() {
    this.setState({
      product: product
    });
  }

  getStyles() {
    this.setState({
      styles: styles
    });
  }

  addToMyOutfit(id) {
    this.setState({
      myOutfits: this.state.myOutfits.push(id)
    });
  }

  removeFromMyOutfit(id) {
    let index = this.state.myOutfits.indexOf(id);
    let copy = this.state.myOutfits;
    copy.splice(index, 1);
    this.setState({
      myOutfits: copy
    }, () => {
      console.log(this.state.myOutfits);
    });
  }

  updateStarRating(rating) {
    this.setState({ starRating: rating });
  }

  render() {
    return (
      <div>
        <ProductOverview starRating={this.state.starRating}/>

        <RatingsAndReviews
          starRating={this.state.starRating}
          updateStarRating={this.updateStarRating.bind(this)}/>
      </div>
    );
  }
}

export default App;