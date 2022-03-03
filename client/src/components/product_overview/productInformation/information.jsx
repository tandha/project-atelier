import React from 'react';

const Information = (props) => {
  return (
    <div id='product-information'>
      <a href="#ratings-and-reviews">Read All Reviews</a><br />
      <div id='star-rating'>{props.starRating}</div>
      <div id='product-category'>{props.product.category}</div>
      <div id='product-name'>{props.product.name}</div>
      <div id='price'>{props.selectedStyle.original_price - props.selectedStyle.sale_price}</div>
    </div>
  );
};

export default Information;
