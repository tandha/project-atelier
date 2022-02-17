import React from 'react';
import axios from 'axios';

class Tile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      helpfulClicked: false,
      helpfulness: 0
    };

    this.onHelpfulClick = this.onHelpfulClick.bind(this);
  }

  onShowMoreClick() {

  }

  componentDidMount() {
    this.setState({ helpfulness: this.props.review.helpfulness });
  }

  onHelpfulClick() {
    if (!this.state.helpfulClicked) {

      let updatedHelpfulness = this.state.helpfulness + 1;
      this.setState({
        helpfulClicked: true,
        helpfulness: updatedHelpfulness
      });

      axios({
        method: 'put',
        url: `/reviews/${this.props.review.review_id}/helpful`,
        params: { 'review_id': this.props.review.review_id }
      })
        .then(response => {})
        .catch(err => console.log(err));
    }
  }

  onThumbnailClick() {

  }

  render() {
    return (
      <div className='review-list-tile'>

        <div className='review-list-tile-rating'>
          <span>Rating: {this.props.review.rating}</span>
        </div>

        <div className='review-list-tile-name'>
          <span>Name: {this.props.review.reviewer_name}</span>
        </div>

        <div className='review-list-tile-date'>
          <span>Date: {renderDate(this.props.review.date)}</span>
        </div>

        <div className='review-list-tile-summary'>
          <span>Summary: {this.props.review.summary}</span>
        </div>

        <div className='review-list-tile-body'>
          <span>Body: {this.props.review.body}</span>
        </div>

        <div className='review-list-tile-photos'>
          <span>Photos: None</span>
        </div>

        <div className='review-list-tile-recommend'>
          <span>Recommended:
            {
              this.props.review.recommend
                ? <span> Yes</span>
                : <span> No</span>
            }
          </span>
        </div>

        <div className='review-list-tile-response'>
          <span>Response: {this.props.review.response}</span>
        </div>

        <div className='review-list-tile-helpful-link'>
          <span>
            Helpful? <a className='review-list-tile-helpful'
              onClick={this.onHelpfulClick}>Yes</a> ({this.state.helpfulness})
          </span>
        </div>

        <br></br>
      </div>
    );
  }
}

export default Tile;

const renderDate = (string) => {
  const date = new Date(string);
  const render = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(date);
  return render;
};