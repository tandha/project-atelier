import React from 'react';
import RelatedList from './related-list.jsx';
import OutfitList from './outfit-list.jsx';

class RelatedItemsOutfitCreation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }




  render() {
    return (
      <div>
        <div>
          <h4>Related Products</h4>
          <RelatedList/>
        </div>
        <div>
          <h4>Your Outfit</h4>
          <OutfitList/>
        </div>
      </div>
    );
  }


}

export default RelatedItemsOutfitCreation;