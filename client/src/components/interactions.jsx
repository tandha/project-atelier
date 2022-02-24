import React from 'react';
import axios from 'axios';

const AddInteractionsLogger = (Component) => {

  const logInteraction = (event) => {
    let elementName = event.target.localName;
    let id = event.target.id;
    let className = event.target.className;

    if (id) {
      elementName = `${elementName}#${id}`;
    }
    if (className) {
      elementName = `${elementName}.${className}`;
    }

    let widgetName = Component.name;
    let timeClicked = new Date().toJSON();

    axios({
      method: 'post',
      url: '/interactions',
      data: {
        element: elementName,
        widget: widgetName,
        time: timeClicked
      }
    }).then(() => {
      console.log(`Interaction logged! \nElement: ${elementName} \n` +
                  `Widget: ${widgetName} \nTime: ${timeClicked}`);
    }).catch(err => console.log(err));
  };

  const ComponentWithLogger = (props) => {
    return (
      <div onClick={logInteraction}>
        <Component {...props} />
      </div>
    );
  };
  return ComponentWithLogger;
};

export default AddInteractionsLogger;