import React from 'react';
import StarRating from '../../starRating.jsx';

const Average = (props) => {
  return (
    <div id='ratings-breakdown-average'>
      <StarRating value={props.starRating} />
    </div>
  );
};

export default Average;