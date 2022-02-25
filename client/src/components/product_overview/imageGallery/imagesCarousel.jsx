// import React from 'react';
import React, { useState, useEffect } from 'react';
import Thumbnails from './imageThumbnails.jsx';
import { IoMdArrowBack, IoMdArrowForward, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const ImageCarousel = (props) => {
//TODO: Handle down arrow disappear when on last image
  const handleDownArrow = (e) => {
    props.updateVisibleThumbnails(1);
  };
  const handleUpArrow = (e) => {
    props.updateVisibleThumbnails(-1);
  };
  return (
    <div id='image-gallery'>
      {props.mainPhotoIndex !== 0 && <IoMdArrowBack id='image-gallery-left-arrow' onClick={props.reverseMainPhoto}/>}
      {props.mainPhotoIndex !== props.photos.length - 1 && <IoMdArrowForward id='image-gallery-right-arrow' onClick={props.advanceMainPhoto} />}

      <img data-testid="main-image" id='main-image' src={props.photos[props.mainPhotoIndex].url}></img>
      <Thumbnails
        photos={props.thumbnailPhotos}
        mainIndex={props.mainPhotoIndex}
        changePhoto={props.changePhoto}/>
      {props.thumbnailPhotos[0].url !== props.photos[props.mainPhotoIndex].url && <IoIosArrowUp onClick={handleUpArrow.bind(this)} id='thumbnail-gallery-up-arrow'/>}
      {
        props.thumbnailPhotos.length === 5 && <IoIosArrowDown onClick={handleDownArrow.bind(this)} id='thumbnail-gallery-down-arrow'/>
      }


    </div>
  );
};

export default ImageCarousel;
