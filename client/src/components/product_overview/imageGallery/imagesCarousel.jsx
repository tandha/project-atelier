import React from 'react';
import Thumbnails from './imageThumbnails.jsx';

const ImageCarousel = (props) => {

  return (
    <div>
      <img id='main-image' src={props.photos[props.mainPhotoIndex].url}></img>
      <Thumbnails photos={props.photos} mainIndex={props.mainPhotoIndex} changePhoto={props.changePhoto}/>
    </div>
  );
};

export default ImageCarousel;