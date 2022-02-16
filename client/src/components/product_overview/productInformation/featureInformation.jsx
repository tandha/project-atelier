import React from 'react';

const Feature = (props) => {
  return (
    <div>
      {props.features.map((feature, i) => {
        let id = 'feature-' + i;
        return <div key={id} id={id} className='features'>{feature.feature}: {feature.value}</div>;
      })}
    </div>
  );
};

export default Feature;