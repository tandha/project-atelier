import React from 'react';

const Buttons = (props) => {

  const onMoreClick = (event) => {
    props.updateLength();
  };

  const onAddReviewClick = (event) => {

  };

  return ( <div id='review-list-buttons'></div> );
};

export default Buttons;