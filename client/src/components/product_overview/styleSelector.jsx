import React from 'react';
import StyleThumbnail from './styleThumbnail.jsx';

const StyleSelector = (props) => {

  return (
    <div>
      <div id='selected-style-name'>{props.name}</div>
      <div id='styles-thumbnails-container'>
        <StyleThumbnail changeStyle={props.changeStyle} styles={props.styles} />
      </div>
    </div>
  );

};

export default StyleSelector;