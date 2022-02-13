import React from 'react';
import Thumbnail from './thumbnail.jsx';

const Thumbnails = (props) => {
  return (
    <div>
      {
        props.photos.map((photo, i) => {
          if (i !== props.mainIndex) {
            return <Thumbnail i={i} thumbnail={photo.thumbnail_url} changePhoto={props.changePhoto}/>;
          }
        })
      }
    </div>
  );
};

export default Thumbnails;