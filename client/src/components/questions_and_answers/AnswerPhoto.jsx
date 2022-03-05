import React from 'react';

const AnswerPhoto = (props) => {
  return (
    <img className='answer-photo' src={props.photo} alt='photo' onClick={() => props.answerPhotoClick(props.photo)}/>
  );
};

export default AnswerPhoto;