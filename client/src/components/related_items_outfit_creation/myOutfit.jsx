import React from 'react';
import { IoIosCloseCircleOutline} from 'react-icons/io';

const MyOutfit = (props) => {

  const handleClick = function() {
    props.toggleOutfit(props.outfit.id);
  };

  return (
    <div className='my-outfit-container'>
      <span className='remove-from-outfit' onClick={handleClick}><IoIosCloseCircleOutline /></span>
      <div className='outfit-image'>
        <img src={props.outfit.image}></img>
      </div>
      <div className='outfit-details'>
        <span className='outfit-category'>{props.outfit.category}</span>
        <span className='outfit-name'>{props.outfit.name}</span>
        <span className='outfit-price'>{props.outfit.price}</span>
        <span className='outfit-rating'>{props.starRating}</span>
      </div>
    </div>
  );

};

export default MyOutfit;