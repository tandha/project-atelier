import React from 'react';

const SearchBar = (props)=> {
  return (
    <div>
      <input id='search-bar' placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={props.handleSearchBar}></input>
    </div>
  );
};

export default SearchBar;