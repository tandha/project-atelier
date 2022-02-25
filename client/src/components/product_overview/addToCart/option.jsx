import React from 'react';

const Option = (props) => {
  return (
    <option data-testid={`select-option-${props.type}`}>{props.option}</option>
  );
};

export default Option;