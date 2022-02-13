import React from 'react';
import Thumbnails from './Thumbnails.jsx';

const Thumbnail = (props) => {

  return (
    <div>
      <img onClick={props.changePhoto.bind(this)} src={props.thumbnail} id={props.i}></img>
    </div>
  );
};

export default Thumbnail;