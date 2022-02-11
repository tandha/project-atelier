import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProductOverview from './product_overview/overview.jsx';
import QuestionsAndAnswers from './questions_and_answers/q&a.jsx';
import RatingsAndReviews from './ratings_and_reviews/ratings&reviews.jsx';
import RelatedItemsOutfitCreation from './related_items_outfit_creation/related_items&outfit.jsx';
import StarRating from './star-rating.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      starRating: 0
    };
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