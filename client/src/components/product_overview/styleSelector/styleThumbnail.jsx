import React from 'react';

const StyleThumbnail = (props) => {
  return (
    <ul>
      {
        props.styles.results.map((style, i) => {
          return <li className='style-thumbnail-container'><img className='style-thumbnail-image' onClick={props.changeStyle} key={i} id={style.style_id} src={style.photos[0].thumbnail_url}></img></li>;
        })
      }
    </ul>
  );

};

export default StyleThumbnail;