import React from 'react';
import Thumbnail from './imageThumbnail.jsx';

const Thumbnails = (props) => {
  return (
    <div id='gallery-thumbnails'>
      {
        props.photos.map((photo, i) => {
          return <Thumbnail key={i} i={i} thumbnail={photo.thumbnail_url} changePhoto={props.changePhoto}/>;
        })
      }
    </div>
  );
};

export default Thumbnails;