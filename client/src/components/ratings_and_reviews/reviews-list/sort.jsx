import React from 'react';

const Sort = (props) => {

  const onSortSelect = (event) => {
    props.updateSort();
  };

  return ( <div id='review-list-sort'></div> );
};

export default Sort;