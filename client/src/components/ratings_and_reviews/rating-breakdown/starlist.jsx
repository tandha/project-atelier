import React from 'react';

const StarList = (props) => {

  const onStarClick = (event) => {
    props.updateFilter();
  };

  return ( <div id='ratings-breakdown-starlist'></div> );
};

export default StarList;