import React from 'react';
import Thumbnails from './thumbnail.jsx';

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPhotoIndex: 0
    };
  }

  changeSelectedPhoto() {

  }

  render() {
    return (
      <div>
        <img src={this.props.photos[this.state.mainPhotoIndex].url}></img>
        <Thumbnails photos={this.props.photos} changePhoto={this.changeSelectedPhotot.bind(this)}/>
      </div>
    );
  }
}

export default ImageCarousel;