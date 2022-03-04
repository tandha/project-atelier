import React from 'react';

const AnswerPhoto = (props) => {
  return (
    <img className='answer-photo' src={props.photo} alt='photo'/>
  );
};

export default AnswerPhoto;