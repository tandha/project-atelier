import React from 'react';

const Thumbnail = (props) => {
  return (
    <div>
      <img width='100' src={props.thumbnail} onClick={props.changePhoto.bind(this)}></img>
    </div>
  );
};

export default Thumbnail;