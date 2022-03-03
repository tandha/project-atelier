import React from 'react';

const Description = (props) => {
  return (
    <div id='slogan-description-features'>
      <div id='product-slogan'>{props.product.slogan}</div>
      <div id='product-description'>{props.product.description}</div>
    </div>
  );
};

export default Description;