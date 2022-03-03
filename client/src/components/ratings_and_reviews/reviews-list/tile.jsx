import React from 'react';
import axios from 'axios';
import StarRating from '../../starRating.jsx';
import { IoMdCheckmarkCircle, IoMdCheckmark } from 'react-icons/io';

class Tile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      helpfulClicked: false,
      helpfulness: 0,
      photoModal: false,
      photoURL: ''
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

  onThumbnailClick(url) {
    this.setState({ photoModal: true, photoURL: url });
  }

  closePhotoModal() {
    this.setState({ photoModal: false, photoURL: '' });
  }

  render() {
    return (
      <div className='review-tile'>

        <div className='review-tile-top-row'>
          <div className='review-tile-rating'>
            <StarRating value={this.props.review.rating} />
          </div>

          <div className='review-tile-name-date'>
            <span><IoMdCheckmarkCircle className='review-tile-checkmark'/>{this.props.review.reviewer_name}, {renderDate(this.props.review.date)}</span>
          </div>
        </div>

        <div className='review-tile-summary'>
          <span>{this.props.review.summary}</span>
        </div>

        <div className='review-tile-body'>
          <span>{this.props.review.body}</span>
        </div>

        <div className='review-tile-photos'>
          {
            this.props.review.photos.length === 0 ? null
              : this.props.review.photos.map((photo, index) => {
                return <img className='review-image' src={photo.url} onClick={this.onThumbnailClick.bind(this, photo.url)} />;
              })
          }
        </div>

        <div className='review-tile-recommend'>
          <span>
            {
              this.props.review.recommend
                ? <span><IoMdCheckmark /> I recommend this product</span>
                : null
            }
          </span>
        </div>

        <div className='review-tile-response'>{
          this.props.review.response
            ? <span>this.props.review.response</span>
            : null
        }</div>

        <div className='review-tile-helpful'>
          <span>
            Helpful? <a className='review-tile-helpful-link'
              onClick={this.onHelpfulClick}>Yes</a> ({this.state.helpfulness})
          </span>
        </div>

        <hr className='review-tile-line'></hr>

        {
          this.state.photoModal
            ? <div id='review-photo-modal'>
              <div id='review-photo-content'>
                <img src={this.state.photoURL}></img><br></br>
                <button onClick={this.closePhotoModal.bind(this)}>Close</button>
              </div>
            </div>
            : null
        }
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