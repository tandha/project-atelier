import React from 'react';

const Buttons = (props) => {

  const onMoreClick = (event) => {
    let element = document.getElementById('review-list-buttons');
    element.scrollIntoView();
    props.updateLength();
  };

  const onAddReviewClick = (event) => {
    props.displayModal();
  };

  if (props.listMaxed) {
    return (
      <div id='review-list-buttons'>
        <div></div>
        <button onClick={onAddReviewClick}>Add A Review +</button>
      </div>
    );
  } else {
    return (
      <div id='review-list-buttons'>
        <button onClick={onMoreClick}>More Reviews</button>&nbsp;&nbsp;
        <button onClick={onAddReviewClick}>Add A Review +</button>
      </div>
    );
  }
};

export default Buttons;