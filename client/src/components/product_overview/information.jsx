import React from 'react';
import Feature from './feature.jsx';

const Information = (props) => {
  return (
    <div id='product-information'>
      <div id='star-rating'>{props.starRating}</div>
      <div id='product-category'>{props.product.category}</div>
      <div id='product-name'>{props.product.name}</div>
      <div id='product-slogan'>{props.product.slogan}</div>
      <Feature features={props.product.features}/>
      <div id='original-price'>{props.selectedStyle.original_price}</div>
      <div id='sale-price'>{props.selectedStyle.sale_price}</div>


    </div>
  );
};

export default Information;