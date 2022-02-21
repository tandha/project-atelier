import React from 'react';

const Buttons = (props) => {

  const onMoreClick = (event) => {
    props.updateLength();
  };

  const onAddReviewClick = (event) => {
    props.displayModal();
  };

  if (props.listMaxed) {
    return (
      <div id='review-list-buttons'>
        <button onClick={onAddReviewClick}>Add A Review</button>
      </div>
    );
  } else {
    return (
      <div id='review-list-buttons'>
        <button onClick={onMoreClick}>More Reviews</button>
        <br></br><br></br>
        <button onClick={onAddReviewClick}>Add A Review</button>
      </div>
    );
  }
};

export default Buttons;