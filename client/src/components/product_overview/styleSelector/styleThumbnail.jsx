import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';

const StyleThumbnail = (props) => {
  let selected = props.selectedStyle.photos[0].thumbnail_url;
  return (
    <div>

      {
        props.styles.results.map((style, i) => {
          return <div data-testid='thumbnail' key={`thumbnail-${i}`} className='style-thumbnail-container'>
            <img className='style-thumbnail-image' onClick={props.changeStyle} key={i} id={style.style_id} src={style.photos[0].thumbnail_url}></img>
            {selected === style.photos[0].thumbnail_url && <IoMdCheckmark id='style-checkmark' />}
          </div>;
        })
      }
    </div>
  );

};

export default StyleThumbnail;