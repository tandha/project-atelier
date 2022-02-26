import React from 'react';
import { IoIosStar} from 'react-icons/io';

const StarRating = (props) => {
  const max = 5;
  const stars = [0, 1, 2, 3, 4];
  const percentage = Math.round((props.value / max) * 100);
  return (
    <div className='star-rating-container'>
      {
        stars.map((index) => {
          return <IoIosStar className='star-rating-star' key={index}/>;
        })
      }
      <div className='star-rating-overlay' style={{width: `${100 - percentage}%`}} />
    </div>
  );
};

export default StarRating;
