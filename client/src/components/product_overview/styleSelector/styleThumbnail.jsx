import React from 'react';

const StyleThumbnail = (props) => {
  return (
    <div>
      {
        props.styles.results.map((style, i) => {
          return <img onClick={props.changeStyle} key={i} id={style.style_id} src={style.photos[0].thumbnail_url}></img>;
        })
      }
    </div>
  );

};

export default StyleThumbnail;