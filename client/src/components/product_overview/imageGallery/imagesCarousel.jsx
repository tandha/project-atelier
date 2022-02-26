// import React from 'react';
import React, { useState, useEffect } from 'react';
import Thumbnails from './imageThumbnails.jsx';
import { IoMdArrowBack, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

const ImageCarousel = (props) => {

  const handleLeftArrow = (e) => {
    let mainId = props.findImageId(props.photos[props.mainPhotoIndex].url);
    let thumbnailId = props.findImageId(props.thumbnailPhotos[0].url);
    if (mainId === thumbnailId) {
      props.reverseThumbnails();
    }
    props.reverseMainPhoto();
  };

  const handleRightArrow = () => {
    let mainId = props.findImageId(props.photos[props.mainPhotoIndex].url);
    let thumbnailId = props.findImageId(props.thumbnailPhotos[props.thumbnailPhotos.length - 1].url);
    if (mainId === thumbnailId) {
      props.advanceThumbnails();
    }
    props.advanceMainPhoto();
  };

  const handleDownArrow = (e) => {
    props.advanceThumbnails();
  };

  const handleUpArrow = (e) => {
    props.reverseThumbnails();
  };
  return (
    <div id='image-gallery'>
      {props.mainPhotoIndex !== 0 &&
      <BsArrowLeftCircleFill id='image-gallery-left-arrow' onClick={handleLeftArrow.bind(this)}/>}
      {props.mainPhotoIndex !== props.photos.length - 1 &&
      <BsArrowRightCircleFill id='image-gallery-right-arrow' onClick={handleRightArrow.bind(this)} />}

      <img data-testid="main-image" id='main-image' src={props.photos[props.mainPhotoIndex].url}></img>
      <Thumbnails
        photos={props.thumbnailPhotos}
        mainPhotoUrl={props.photos[props.mainPhotoIndex].thumbnail_url}
        mainIndex={props.mainPhotoIndex}
        changePhoto={props.changePhoto}/>
      {props.findImageId(props.thumbnailPhotos[0].url) !== props.findImageId(props.photos[0].url) && <IoIosArrowUp onClick={handleUpArrow.bind(this)} id='thumbnail-gallery-up-arrow'/>}
      {props.thumbnailPhotos[props.thumbnailPhotos.length - 1] !== props.photos[props.photos.length - 1] && <IoIosArrowDown onClick={handleDownArrow.bind(this)} id='thumbnail-gallery-down-arrow'/>}


    </div>
  );
};

export default ImageCarousel;

