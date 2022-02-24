import React from 'react';
import MyOutfit from './myOutfit.jsx';

const MyOutfits = (props) => {

  return (
    <div id='my-outfits-container'>
      {
        props.myOutfits.map((outfit, i) => {
          let key = 'outfit-' + i;
          return <MyOutfit key={key} starRating={props.starRating} outfit={outfit}/>;
        })
      }
    </div>
  );

};

export default MyOutfits;