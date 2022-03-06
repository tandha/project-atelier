import React from 'react';
import Thumbnail from './imageThumbnail.jsx';

const Thumbnails = (props) => {
  return (
    <ul id='gallery-thumbnails'>
      {
        props.photos.map((photo, i) => {
          return <Thumbnail key={i} i={i} expandedView={props.expandedView} mainPhotoUrl={props.mainPhotoUrl} mainIndex={props.mainIndex} thumbnail={photo.thumbnail_url} changePhoto={props.changePhoto} />;
        })
      }
    </ul>

  );
};

export default Thumbnails;