import React from 'react';

const Thumbnail = (props) => {
  return (
    <div>
      <img src={props.thumbnail} onClick={props.changePhoto.bind(this)} id={props.i}></img>
    </div>
  );
};

export default Thumbnail;