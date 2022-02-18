import React from 'react';

const Buttons = (props) => {

  const onMoreClick = (event) => {
    props.updateLength();
  };

  const onAddReviewClick = (event) => {

  };

  if (props.listMaxed) {
    return (
      <div id='review-list-buttons'>
      </div>
    );
  } else {
    return (
      <div id='review-list-buttons'>
        <button onClick={onMoreClick}>More Reviews</button>
      </div>
    );
  }
};

export default Buttons;