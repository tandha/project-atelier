import React from 'react';

const Thumbnail = (props) => {
  return (
    <li>
      <img src={props.thumbnail} id={props.i} className='gallery-thumbnail' onClick={props.changePhoto.bind(this)}></img>
      {
        props.mainIndex === props.i && <div id='thumbnail-highlight-bar'></div>
      }
    </li>
  );
};

export default Thumbnail;