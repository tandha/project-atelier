import React from 'react';

const Thumbnail = (props) => {
  return (
    <div>
      <img src={props.thumbnail} id={props.i} className='gallery-thumbnail' onClick={props.changePhoto.bind(this)}></img>
    </div>
  );
};

export default Thumbnail;