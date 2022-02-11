import React from 'react';
import Sort from './sort.jsx';
import Tile from './tile.jsx';
import Buttons from './buttons.jsx';

class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      listLength: 2,
      listMaxed: false,
      currentSort: 'relevant'
    };
  }

  updateSort(sort) {

  }

  updateLength() {

  }

  render() {
    return (
      <div id='review-list'>
        <Sort updateSort={this.updateSort.bind(this)}/>
        <Tile />
        <Buttons updateLength={this.updateLength.bind(this)}/>
      </div>)
    ;
  }
}

export default List;