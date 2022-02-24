import React from 'react';
import { IoIosStarOutline, IoIosStar} from 'react-icons/io';

const RelatedItem = (props) => {

  return (
    <div className='related-item-container'>
      <span className='related-item-outfit-toggle-button'><IoIosStarOutline /></span>
      <div className='related-item-image'>
        <img src={props.relatedItem.image}></img>
      </div>
      <div className='related-items-details'>
        <span className='related-item-category'>{props.relatedItem.category}</span>
        <span className='related-item-name'>{props.relatedItem.name}</span>
        <span className='related-item-price'>{props.relatedItem.price}</span>
        <span className='related-item-star-rating'>{props.starRating}</span>
      </div>
    </div>
  );

};

export default RelatedItem;