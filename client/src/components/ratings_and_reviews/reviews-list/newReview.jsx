import React from 'react';
import axios from 'axios';

const NewReview = (props) => {

  const onUploadClick = (event) => {
    event.preventDefault();
    props.updateLength();
  };

  const onSubmitClick = (event) => {
    event.preventDefault();
  };

  return ( <div id='new-review'></div> );
};

export default NewReview;