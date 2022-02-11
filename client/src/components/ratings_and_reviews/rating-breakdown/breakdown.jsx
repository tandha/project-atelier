import React from 'react';
import Average from './average.jsx';
import StarList from './starlist.jsx';
import Styles from './styles.jsx';

const Breakdown = (props) => {
  return (
    <div id='ratings-breakdown'>
      <Average starRating={props.starRating}/>
      <StarList updateFilter={props.updateFilter}/>
      <Styles />
    </div>
  );
};

export default Breakdown;