import React from 'react';

const StarList = (props) => {

  const onStarClick = (event) => {
    props.updateFilter(event.target.id.substring(0, 1));
  };

  const calculatePercentage = (ratings) => {
    let result = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    let total = 0;

    for (let key in ratings) {
      total += parseInt(ratings[key]);
    }
    for (let key in ratings) {
      result[key] = (parseInt(ratings[key]) / total) * 200;
    }
    return Object.values(result);
  };

  let ratings = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
  let percentages = [0, 0, 0, 0, 0];

  if (props.metaData.data) {
    for (let key in props.metaData.data.ratings) {
      ratings[key] = props.metaData.data.ratings[key];
    }
    percentages = calculatePercentage(ratings);
  }

  return (
    <React.Fragment>
      <div id='ratings-breakdown-starlist'>
        <div id='stars-list'>
          {percentages.map((percent, index) => {
            let num = index + 1;
            return (
              <div className='star-row' id={num + '-star-row-1'} key={index} onClick={onStarClick}>
                <div className='star-label' id={num + '-star-row-2'}>{num} stars</div>
                <div className='star-bar' id={num + '-star-row-3'}>
                  <div className='star-bar-fill' id={num + '-star-row-4'} style={{width: percent}}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div id='stars-filter'>
        <span>Filters: {
          props.currentFilter.map((rating, index) => {
            if (index === props.currentFilter.length - 1) {
              return <span key={index}>{rating}</span>;
            } else {
              return <span key={index}>{rating}, </span>;
            }
          })
        }</span><br></br>

        {
          props.currentFilter.length > 0
            ? <span onClick={onStarClick} id='0-star-bar' className='remove-filter'>Remove all filters</span>
            : <span></span>
        }
      </div>
    </React.Fragment>
  );
};

export default StarList;