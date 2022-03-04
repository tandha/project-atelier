import React from 'react';

const Description = (props) => {
  return (
    <div id='slogan-description-container'>
      <div id='product-slogan'>{props.product.slogan}</div>
      <div id='product-description'>{props.product.description}</div>
    </div>
  );
};

export default Description;