import React from 'react';
import RelatedItem from './relatedItem.jsx';

const RelatedItems = (props) => {

  return (
    <div id='related-items-container'>
      {props.relatedItems.map((item, i) => {
        let key = 'related-item-' + i;
        return <RelatedItem key={key} updateProduct={props.updateProduct} starRating={props.starRating} relatedItem={item}/>;
      })}
    </div>
  );

};

export default RelatedItems;