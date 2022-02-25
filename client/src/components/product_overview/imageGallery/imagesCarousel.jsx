// import React from 'react';
import React, { useState, useEffect } from 'react';
import Thumbnails from './imageThumbnails.jsx';
const ImageCarousel = (props) => {

  return (
    <div id='image-gallery'>
      <img data-testid="main-image" id='main-image' src={props.photos[props.mainPhotoIndex].url}></img>
      <Thumbnails photos={props.photos} mainIndex={props.mainPhotoIndex} changePhoto={props.changePhoto}/>
    </div>
  );
};

export default ImageCarousel;
