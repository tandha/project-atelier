import React from 'react';

let InteractionsWrapper = (Component) => {

  let widgetName = Component.name;

  const handleClick = (event) => {
    console.log(event);
    // event.target.localName
    // event.target.className
    // event.target.id
    // call API
  };

  return (props) => {
    return (
      <div id={`${widgetName}-interaction-container`} onClick={handleClick}>
        <Component {...props} />
      </div>
    );
  };
};

export default InteractionsWrapper;