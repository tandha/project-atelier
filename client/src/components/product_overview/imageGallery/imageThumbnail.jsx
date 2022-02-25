import React from 'react';

const Thumbnail = (props) => {
  return (
    <li>
      <img src={props.thumbnail} id={props.i} className='gallery-thumbnail' onClick={props.changePhoto.bind(this)}></img>
    </li>
  );
};

export default Thumbnail;