// import React from 'react';
import React, { useState, useEffect } from 'react';
import Thumbnails from './imageThumbnails.jsx';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';

const ImageCarousel = (props) => {

  return (
    <div id='image-gallery'>
      <IoMdArrowBack id='image-gallery-left-arrow' onClick={props.reverseMainPhoto}/>
      <IoMdArrowForward id='image-gallery-right-arrow' onClick={props.advanceMainPhoto} />
      <img data-testid="main-image" id='main-image' src={props.photos[props.mainPhotoIndex].url}></img>
      <Thumbnails photos={props.photos} mainIndex={props.mainPhotoIndex} changePhoto={props.changePhoto}/>
    </div>
  );
};

export default ImageCarousel;
