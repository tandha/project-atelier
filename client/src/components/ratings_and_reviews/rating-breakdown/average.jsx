import React from 'react';
import StarRating from '../../starRating.jsx';

const Average = (props) => {
  return (
    <React.Fragment>
      <div id='ratings-breakdown-average'>
        <div id='big-rating'>
          {props.starRating}
        </div>
        <div id='average-stars'>
          <StarRating value={props.starRating} />
        </div>
      </div>
      {
        !isNaN(props.recommendedPercent)
          ? <div id='recommended-percent'>{props.recommendedPercent}% of reviews recommend this product</div>
          : null
      }
    </React.Fragment>
  );
};

export default Average;