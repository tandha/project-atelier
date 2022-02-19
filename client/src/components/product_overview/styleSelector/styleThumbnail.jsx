import React from 'react';

const StyleThumbnail = (props) => {
  return (
    <div>
      {
        props.styles.results.map((style, i) => {
          return <div className='style-thumbnail-container'><img className='style-thumbnail-image' onClick={props.changeStyle} key={i} id={style.style_id} src={style.photos[0].thumbnail_url}></img></div>;
        })
      }
    </div>
  );

};

export default StyleThumbnail;