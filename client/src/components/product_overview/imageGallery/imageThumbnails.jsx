import React from 'react';
import Thumbnail from './imageThumbnail.jsx';

const Thumbnails = (props) => {
  return (
    <div>
      {
        props.photos.map((photo, i) => {
          if (i !== props.mainIndex) {
            return <Thumbnail key={i} i={i} thumbnail={photo.thumbnail_url} changePhoto={props.changePhoto}/>;
          }
        })
      }
    </div>
  );
};

export default Thumbnails;