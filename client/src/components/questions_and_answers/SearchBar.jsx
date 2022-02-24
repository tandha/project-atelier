import React from 'react';

const SearchBar = (props)=> {
  return (
    <>
      <input id='QA-search-bar' placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={props.handleSearchBar}></input>
    </>
  );
};

export default SearchBar;