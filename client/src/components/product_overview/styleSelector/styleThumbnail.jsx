import React from 'react';

const StyleThumbnail = (props) => {
  return (
    <ul>
      {
        props.styles.results.map((style, i) => {
          return <div key={`thumbnail-${i}`} className='style-thumbnail-container'><img className='style-thumbnail-image' onClick={props.changeStyle} key={i} id={style.style_id} src={style.photos[0].thumbnail_url}></img></div>;
        })
      }
    </ul>
  );

};

export default StyleThumbnail;