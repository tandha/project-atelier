import React from 'react';

const Styles = (props) => {

  let styles = {};
  let styleKeys = [];
  let styleVals = [];

  if (props.metaData.data) {
    styles = props.metaData.data.characteristics;
    styleKeys = Object.keys(styles);
    styleVals = styleKeys.map(style => {
      return styles[style].value;
    });
  }

  // const renderStyles = () => {
  //   let render = [];
  //   for (let style in styles) {
  //     render.push(
  //       <p>{style}: {styles[style]}</p>
  //     );
  //   }
  //   return render;
  // };

  return (
    <div id='ratings-breakdown-styles'>
      <br></br>
      Ratings Breakdown:
      <br></br>
      {
        styleKeys.map((style, index) => {
          return (
            <div key={index}>{style}: {Number.parseFloat(styleVals[index]).toFixed(1)}</div>
          );
        })
      }
    </div>
  );
};

export default Styles;