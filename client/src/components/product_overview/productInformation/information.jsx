import React from 'react';

const Information = (props) => {
  return (
    <div id='product-information'>
      <div id='star-rating'>{props.starRating}</div>
      <a id='reviews' href="#ratings-and-reviews">Read All Reviews</a>
      <div id='product-category'>{props.product.category}</div>
      <h1 id='product-name'>{props.product.name}</h1>
      <div id='price'>${props.selectedStyle.original_price - props.selectedStyle.sale_price}</div>
    </div>
  );
};

export default Information;
