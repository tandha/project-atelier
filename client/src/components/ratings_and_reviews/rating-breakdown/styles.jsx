import React from 'react';
import { VscTriangleDown } from 'react-icons/vsc';

const Styles = (props) => {

  let styles = {};
  let styleKeys = [];
  let styleVals = [];

  let charsScale = {
    Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Quality', 'Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
  };

  if (props.metaData.data) {
    styles = props.metaData.data.characteristics;
    styleKeys = Object.keys(styles);
    styleVals = styleKeys.map(style => {
      return styles[style].value;
    });
  }

  return (
    <div id='ratings-breakdown-styles'>
      {
        styleKeys.map((style, index) => {
          return (
            <React.Fragment key={index}>
              <div className='chars-name'>{style}</div>
              <VscTriangleDown size={28} color={'gray'} className='chars-icon'
                style={{left: (45 * Number.parseFloat(styleVals[index])).toFixed()}}
              />
              <div className='chars-bar'></div>
              <div className='chars-list'>
                <span className='char-left'>{charsScale[style][0]}</span>
                <span className='char-right'>{charsScale[style][4]}</span>
              </div>

            </React.Fragment>
          );
        })
      }
    </div>
  );
};

export default Styles;