import React from 'react';

const Sort = (props) => {

  const onSortSelect = (event) => {
    props.updateSort(event.target.value);
  };

  return (
    <div id='review-list-sort'>
      <p>
        {props.numReviews} reviews, sorted by&nbsp;
        <select onChange={onSortSelect}>
          <option value='relevant'>Relevant</option>
          <option value='newest'>Newest</option>
          <option value='helpful'>Helpful</option>
        </select>
      </p>
    </div>
  );
};

export default Sort;