import React from 'react';
import StarRating from '../../starRating.jsx';

const Average = (props) => {
  return (
    <div id='ratings-breakdown-average'>
      <div id='big-rating'>
        {props.starRating}
      </div>
      <div id='average-stars'>
        <StarRating value={props.starRating} />
      </div>
    </div>
  );
};

export default Average;