import React from 'react';

const Thumbnail = (props) => {
  let id = `thumbnail-${props.i}`;
  return (
    <li>
      <img src={props.thumbnail} id={id} className='gallery-thumbnail' onClick={props.changePhoto.bind(this)}></img>
      {
        props.mainPhotoUrl === props.thumbnail && <div id='thumbnail-highlight-bar'></div>
      }
    </li>
  );
};

export default Thumbnail;