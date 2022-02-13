import React from 'react';
import Thumbnails from './thumbnails.jsx';

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPhotoIndex: 0
    };
  }

  changeSelectedPhoto(e) {
    let index = e.target.id;
    this.setState({
      mainPhotoIndex: Number(index)
    });
  }

  render() {
    return (
      <div>
        <img src={this.props.photos[this.state.mainPhotoIndex].url}></img>
        <Thumbnails photos={this.props.photos} mainIndex={this.state.mainPhotoIndex} changePhoto={this.changeSelectedPhoto.bind(this)}/>
      </div>
    );
  }
}

export default ImageCarousel;