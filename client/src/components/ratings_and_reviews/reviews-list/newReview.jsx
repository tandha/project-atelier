import React from 'react';
import axios from 'axios';

const NewReview = (props) => {

  const onUploadClick = (event) => {
    event.preventDefault();
  };

  const onSubmitClick = (event) => {
    event.preventDefault();
  };

  return (
    <div id='new-review-modal'>
      <div id='new-review-content'>
        <span>Write Your Review</span><br></br>
        <span>Abount the {props.product.name}</span>
      </div>
    </div>
  );
};

export default NewReview;