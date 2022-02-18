import React from 'react';

const AnswerPhoto = (props) => {
  return (
    <img src={props.photo} style={imgStyle}/>
  );
};

export default AnswerPhoto;

const imgStyle = {
  height: '100px',
  display: 'inline-grid'
};