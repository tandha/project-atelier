import React from 'react';
import StyleThumbnail from './styleThumbnail.jsx';

const StyleSelector = (props) => {

  return (
    <div id='selected-styles'>
      <span id='style-title'>{'Style > '}</span>
      <span data-testid="selected-style-name" id='selected-style-name'>{props.selectedStyle.name}</span>
      <div id='styles-thumbnails-container'>
        <StyleThumbnail changeStyle={props.changeStyle} selectedStyle={props.selectedStyle} styles={props.styles} />
      </div>
    </div>
  );

};

export default StyleSelector;