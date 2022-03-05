import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';

const Feature = (props) => {
  return (
    <ul id='features-container'>
      {props.features.map((feature, i) => {
        let id = 'feature-' + i;
        return <li key={id} id={id} className='features'><IoMdCheckmark />{feature.feature}: {feature.value}</li>;
      })}
    </ul>
  );
};

export default Feature;