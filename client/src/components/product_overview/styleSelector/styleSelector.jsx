import React from 'react';
import StyleThumbnail from './styleThumbnail.jsx';

const StyleSelector = (props) => {

  return (
    <div id='selected-styles'>
      <div id='selected-style-name'><strong>Style</strong> {props.name}</div>
      <div id='styles-thumbnails-container'>
        <StyleThumbnail changeStyle={props.changeStyle} styles={props.styles} />
      </div>
    </div>
  );

};

export default StyleSelector;