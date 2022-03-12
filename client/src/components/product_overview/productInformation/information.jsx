import React from 'react';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';

const Information = (props) => {
  let darkMode = false;

  const toggleMode = () => {
    const app = document.getElementById('app');
    darkMode = !darkMode;
    if (darkMode) {
      app.classList.add('dark-mode-app');
    } else {
      app.classList.remove('dark-mode-app');
    }
  };
  return (
    <div id='product-information'>
      <div id='toggle-mode'>
        {darkMode ? <BsToggleOff onClick={toggleMode.bind(this)} /> : <BsToggleOn onClick={toggleMode.bind(this)}/>}
      </div>
      <div id='star-rating'>{props.starRating}</div>
      <a id='reviews' href="#ratings-and-reviews">Read All Reviews</a>
      <div id='product-category'>{props.product.category}</div>
      <h1 id='product-name'>{props.product.name}</h1>
      <div id='price'>${props.selectedStyle.original_price - props.selectedStyle.sale_price}</div>
    </div>
  );
};

export default Information;
