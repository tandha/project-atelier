import React from 'react';

const Feature = (props) => {
  return (
    <div>
      {props.features.map((feature, i) => {
        let id = 'feature-' + i;
        return <div id={id} className='features'>{feature.feature}: {feature.value}</div>;
      })}
    </div>
  );
};

export default Feature;