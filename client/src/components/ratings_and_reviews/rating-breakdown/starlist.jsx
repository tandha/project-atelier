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
      result[key] = ((parseInt(ratings[key]) / total) * 100).toFixed();
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

  return (
    <div id='ratings-breakdown-starlist'>

      <span onClick={onStarClick} id='star-list-1'>1 star
        <div className='star-bar' id={ratings[1]}>
          <span className='star-bar-fill'></span>
        </div>
      </span><br></br>

      <span onClick={onStarClick} id='2'>2 Star: {ratings[2]}</span><br></br>
      <span onClick={onStarClick} id='3'>3 Star: {ratings[3]}</span><br></br>
      <span onClick={onStarClick} id='4'>4 Star: {ratings[4]}</span><br></br>
      <span onClick={onStarClick} id='5'>5 Star: {ratings[5]}</span><br></br>
      <br></br>
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