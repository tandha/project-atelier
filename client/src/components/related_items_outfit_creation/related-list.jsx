import React from 'react';
import RelatedItem from './relatedItem.jsx';

const RelatedItems = (props) => {

  return (
    <div id='related-items-container'>
      {props.relatedItems.map((item) => {
        return <RelatedItem relatedItem={item}/>;
      })}
    </div>
  );

};

export default RelatedItems;