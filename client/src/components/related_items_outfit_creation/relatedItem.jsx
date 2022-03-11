import React from 'react';
import { IoIosStarOutline, IoIosStar} from 'react-icons/io';

const RelatedItem = (props) => {

  const handleClick = (e) => {
    let productId = props.relatedItem.id;
    props.updateProduct(productId);
  };

  return (
    <div onClick={handleClick.bind(this)} className='related-item-container'>
      <span className='related-item-outfit-toggle-button'><IoIosStarOutline /></span>
      <div className='related-item-image'>
        <img src={props.relatedItem.image || 'https://www.phswarnerhoward.co.uk/assets/images/no_img_avaliable.jpg'}></img>
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