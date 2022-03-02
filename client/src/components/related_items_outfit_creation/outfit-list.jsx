import React from 'react';
import MyOutfit from './myOutfit.jsx';
import { RiAddLine } from 'react-icons/ri';

const MyOutfits = (props) => {

  return (

    <div id='my-outfits-container'>
      { props.myOutfits.length === 0 ?
        <div className='my-outfit-container'>
          <RiAddLine id='add-to-outfit'/>
        </div> :

        props.myOutfits.map((outfit, i) => {
          let key = 'outfit-' + i;
          return <MyOutfit key={key} starRating={props.starRating} outfit={outfit} toggleOutfit={props.toggleOutfit}/>;
        })

      }
    </div>
  );

};

export default MyOutfits;
