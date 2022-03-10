import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';

const StyleThumbnail = (props) => {
  return (
    <div>
      {
        props.styles.results.map((style, i) => {
          return <div data-testid='thumbnail' key={`thumbnail-${i}`} className='style-thumbnail-container'>
            <img className='style-thumbnail-image' onClick={props.changeStyle} key={i} id={style.style_id} src={style.photos[0].thumbnail_url || 'https://www.phswarnerhoward.co.uk/assets/images/no_img_avaliable.jpg'}></img>
            {props.selectedStyle.style_id === style.style_id && <IoMdCheckmark id='style-checkmark' />}
          </div>;
        })
      }
    </div>
  );

};

export default StyleThumbnail;


// {selected === style.photos[0].thumbnail_url && <IoMdCheckmark id='style-checkmark' />}