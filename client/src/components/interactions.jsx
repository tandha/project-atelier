import React from 'react';
import axios from 'axios';

let AddInteractionsLogger = (Component) => {

  let widgetName = Component.name;

  const handleClick = (event) => {
    let elementName = event.target.localName;
    let id = event.target.id;
    let className = event.target.className;

    if (id) {
      elementName = `${elementName}#${id}`;
    }
    if (className) {
      elementName = `${elementName}.${className}`;
    }

    let timeClicked = new Date().toJSON();

    axios({
      method: 'post',
      url: '/interactions',
      data: {
        element: elementName,
        widget: widgetName,
        time: timeClicked
      }
    })
      .then(() => {
        console.log(
          `Interaction logged!\nElement: ${elementName}\nWidget: ${widgetName}\nTime: ${timeClicked}`
        );
      })
      .catch(err => console.log(err));
  };

  return (props) => {
    return (
      <div id={`${widgetName}-interaction-wrapper`} onClick={handleClick}>
        <Component {...props} />
      </div>
    );
  };
};

export default AddInteractionsLogger;