import React from 'react';
import Thumbnail from './imageThumbnail.jsx';

const Thumbnails = (props) => {
  return (
    <div id='gallery-thumbnails'>
      {
        props.photos.map((photo, i) => {
          if (i !== props.mainIndex) {
            return <Thumbnail key={i} id={i} class='gallery-thumbnail' thumbnail={photo.thumbnail_url} changePhoto={props.changePhoto}/>;
          }
        })
      }
    </div>
  );
};

export default Thumbnails;