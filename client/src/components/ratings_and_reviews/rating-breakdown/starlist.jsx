import React from 'react';

const StarList = (props) => {

  const onStarClick = (event) => {
    props.updateFilter(event.target.id);
  };

  const calculatePercentage = (ratings) => {
    let result = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    let total = 0;

    for (let key in ratings) {
      total += parseInt(ratings[key]);
    }
    for (let key in ratings) {
      result[key] = (parseInt(ratings[key]) / total) * 100;
    }
    return result;
  };

  let ratings = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

  if (props.metaData.data) {
    for (let key in props.metaData.data.ratings) {
      ratings[key] = props.metaData.data.ratings[key];
    }
    ratings = calculatePercentage(ratings);
  }

  let percentages = Object.values(ratings);

  return (
    <div id='ratings-breakdown-starlist'>

      {percentages.map((percent, index) => {
        let num = index + 1;
        return (
          <React.Fragment key={index}>
            <span onClick={onStarClick}>{num} stars
              <div className='star-bar'>
                <span className='star-bar-fill' style={{width: percent}}></span>
              </div>
            </span>
          </React.Fragment>
        );
      })}

      <span>Filters: <br></br> {
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
          ? <span onClick={onStarClick} id='0'>Remove</span>
          : <span></span>
      }
    </div>
  );
};

export default StarList;