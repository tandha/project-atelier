import React from 'react';
import axios from 'axios';

class Tile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      helpfulClicked: false
    };
  }

  onShowMoreClick() {

  }

  onHelpfulClick() {

  }

  onThumbnailClick() {

  }

  render() {
    return ( <div id='review-list-tile'></div> );
  }
}

export default Tile;