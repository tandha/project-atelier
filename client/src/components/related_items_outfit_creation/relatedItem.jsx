import React from 'react';
import RelatedIem from './relatedItem.jsx';

const RelatedItem = (props) => {

  return (
    <div>
      <span>A lil bitty star</span>
      <img src={props.relatedItem.image}></img>
      <span>{props.relatedItem.category}</span>
      <span>{props.relatedItem.name}</span>
      <span>{props.relatedItem.price}</span>
      <span>{props.relatedItem.starRating}</span>
    </div>
  );

};

export default RelatedItem;