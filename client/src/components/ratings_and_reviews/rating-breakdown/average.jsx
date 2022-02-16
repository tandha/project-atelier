import React from 'react';

const Average = (props) => {
  return (
    <div id='ratings-breakdown-average'>
      <p>Average Rating: {props.starRating}</p>
    </div>
  );
};

export default Average;