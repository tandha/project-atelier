import React from 'react';

const Buttons = (props) => {

  const onMoreClick = (event) => {
    props.updateLength(true);
  };

  const onAddReviewClick = (event) => {
    props.displayModal();
  };

  if (props.listMaxed) {
    return (
      <div id='review-list-buttons'>
        {/* <div></div> Did I need this div for something? */}
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