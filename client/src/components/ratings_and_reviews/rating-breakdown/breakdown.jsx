import React from 'react';
import Average from './average.jsx';
import StarList from './starlist.jsx';
import Styles from './styles.jsx';
import axios from 'axios';

class Breakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewMetaData: {},
      recommendedPercent: 0
    };
  }

  componentDidMount() {
    this.getReviewMetaData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.productID !== this.props.productID) {
      this.getReviewMetaData();
    }
  }

  getReviewMetaData() {
    axios({
      method: 'get',
      url: '/reviews/meta',
      params: { 'product_id': this.props.productID }
    })
      .then(response => {
        let ratings = response.data.data.ratings;
        let recommended = response.data.data.recommended;
        this.calculateAverageScore(ratings);
        this.calculateRecommendedPercent(recommended);
        this.setState({ reviewMetaData: response.data }, () => {
          this.props.updateChars(this.state.reviewMetaData.data.characteristics);
        });
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

  calculateRecommendedPercent(recommended) {
    let trueCount = parseInt(recommended.true);
    let falseCount = parseInt(recommended.false);
    let total = trueCount + falseCount;
    let percent = ((trueCount / total) * 100).toFixed();
    this.setState({ recommendedPercent: percent });
  }

  render() {
    return (
      <div id='ratings-breakdown'>
        <Average
          starRating={this.props.starRating}
          recommendedPercent={this.state.recommendedPercent}
        />
        <StarList
          updateFilter={this.props.updateFilter}
          metaData={this.state.reviewMetaData}
          currentFilter={this.props.currentFilter}
        />
        <Styles metaData={this.state.reviewMetaData}/>
      </div>
    );
  }
}

export default Breakdown;