import React from 'react';
import StyleThumbnail from './styleThumbnail.jsx';

const StyleSelector = (props) => {

  return (
    <div id='selected-styles'>
      <strong>{'Style > '}</strong>
      <span data-testid="selected-style-name" id='selected-style-name'>{props.name}</span>
      <div id='styles-thumbnails-container'>
        <StyleThumbnail changeStyle={props.changeStyle} styles={props.styles} />
      </div>
    </div>
  );

};

export default StyleSelector;