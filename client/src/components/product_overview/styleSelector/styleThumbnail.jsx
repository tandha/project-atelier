import React from 'react';

const StyleThumbnail = (props) => {
  return (
    <div>
      {
        props.styles.results.map((style, i) => {
          return <img width='50' onClick={props.changeStyle} key={i} id={style.style_id} src={style.photos[0].thumbnail_url}></img>;
        })
      }
    </div>
  );

};

export default StyleThumbnail;