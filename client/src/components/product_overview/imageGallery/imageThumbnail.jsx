import React from 'react';

const Thumbnail = (props) => {
  let id = `thumbnail-${props.i}`;
  let className = 'gallery-thumbnail';
  if (props.expandedView) {
    className = 'expanded-view-true';
  }

  return (
    <li>
      <img src={props.thumbnail} id={id} className={className} onClick={props.changePhoto.bind(this)}></img>
      {
        props.mainPhotoUrl === props.thumbnail && <div id='thumbnail-highlight-bar'></div>
      }
    </li>
  );
};

export default Thumbnail;