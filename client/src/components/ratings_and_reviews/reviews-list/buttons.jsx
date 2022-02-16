import React from 'react';

const Buttons = (props) => {

  const onMoreClick = (event) => {
    props.updateLength();
  };

  const onAddReviewClick = (event) => {

  };

  return (
    <div id='review-list-buttons'>
      <button onClick={onMoreClick}>More Reviews</button>
    </div>
  );
};

export default Buttons;