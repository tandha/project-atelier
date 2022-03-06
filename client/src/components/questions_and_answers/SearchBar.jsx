import React from 'react';
import {IoSearch} from 'react-icons/io5';

const SearchBar = (props)=> {
  return (
    <div className='search-wrapper'>
      <input id='QA-search-bar'
        placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'
        onChange={props.handleSearchBar}>
      </input>
      <IoSearch id='search-icon'/>
    </div>
  );
};

export default SearchBar;