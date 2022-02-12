import React from 'react';

const SearchBar = (props)=> {
  return (
    <div style={myStyles}>
      <input size="100" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={props.handleSearchBar}></input>
    </div>
  );
};

export default SearchBar;

var myStyles = {
  height: '50px',
  display: 'inline - grid',
  width: '90%'
};