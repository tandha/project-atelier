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
      result[key] = (parseInt(ratings[key]) / total) * 100;
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
        <div id='stars-left'>
          <div className='star-label' id={'1-star-bar'} onClick={onStarClick}>1 stars</div>
          <div className='star-label' id={'2-star-bar'} onClick={onStarClick}>2 stars</div>
          <div className='star-label' id={'3-star-bar'} onClick={onStarClick}>3 stars</div>
          <div className='star-label' id={'4-star-bar'} onClick={onStarClick}>4 stars</div>
          <div className='star-label' id={'5-star-bar'} onClick={onStarClick}>5 stars</div>
        </div>

        <div id='stars-right'>
          {percentages.map((percent, index) => {
            let num = index + 1;
            return (
              <React.Fragment key={index}>
                <div className='star-bar' id={`${num.toString()}-star-bar`}>
                  <div className='star-bar-fill' style={{width: percent}}></div>
                </div>
              </React.Fragment>
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
            ? <span onClick={onStarClick} id='0-star-bar' className='remove-filter'>Remove</span>
            : <span></span>
        }
      </div>
    </React.Fragment>
  );
};

export default StarList;