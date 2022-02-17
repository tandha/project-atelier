import React from 'react';
import Average from './average.jsx';
import StarList from './starlist.jsx';
import Styles from './styles.jsx';
import axios from 'axios';

class Breakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewMetaData: {}
    };
    this.placeHolderID = 64621;
  }

  componentDidMount() {
    this.getReviewMetaData();
  }

  getReviewMetaData() {
    axios({
      method: 'get',
      url: '/reviews/meta',
      params: { 'product_id': this.placeHolderID }
    })
      .then(response => {
        let ratings = response.data.data.ratings;
        this.calculateAverageScore(ratings);
        this.setState({ reviewMetaData: response.data });
      })
      .catch(err => console.log(err));
  }

  calculateAverageScore(ratings) {
    let scoreTotal = 0;
    let countTotal = 0;

    for (let score in ratings) {
      scoreTotal += ratings[score] * score;
      countTotal += Number.parseInt(ratings[score]);
    }
    let averageScore = scoreTotal / countTotal;
    let roundedScore = averageScore.toFixed(1);

    if (isNaN(roundedScore)) {
      this.props.updateStarRating(0);
    } else {
      this.props.updateStarRating(roundedScore);
    }
  }

  render() {
    return (
      <div id='ratings-breakdown'>
        <Average starRating={this.props.starRating}/>
        <StarList updateFilter={this.props.updateFilter}/>
        <Styles />
      </div>
    );
  }
}

export default Breakdown;