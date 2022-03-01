import React from 'react';

const Sort = (props) => {

  const onSortSelect = (event) => {
    props.updateSort(event.target.value);
  };

  return (
    <div id='review-list-sort'>
      <p>
        {props.numReviews} reviews, sorted by&nbsp;
        <select id='reviews-sort-dropdown' onChange={onSortSelect}>
          <option value='relevant'>relevance</option>
          <option value='newest'>newest</option>
          <option value='helpful'>helpful</option>
        </select>
      </p>
    </div>
  );
};

export default Sort;