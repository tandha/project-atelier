import React from 'react';
import { render, screen } from '@testing-library/react';

import RatingsAndReview from '../ratings&reviews.jsx';

import Breakdown from '../rating-breakdown/breakdown.jsx';
import Average from '../rating-breakdown/average.jsx';
import StarList from '../rating-breakdown/starlist.jsx';
import Styles from '../rating-breakdown/styles.jsx';

import List from '../reviews-list/list.jsx';
import Sort from '../reviews-list/sort.jsx';
import Tile from '../reviews-list/tile.jsx';
import Buttons from '../reviews-list/buttons.jsx';

describe('Component Renders', () => {
  test('RatingsAndReview', () => {
    let props = {
      starRating: '3.5',
      updateStarRating: () => {}
    };
    render(<RatingsAndReview {...props}/>);
  });
  test('Breakdown', () => {
    let props = {
      starRating: 3.5,
      updateStarRating: () => {},
      updateFilter: () => {},
      productID: 39482,
      currentFilter: [1, 2]
    };
    render(<Breakdown {...props}/>);
  });
  test('Average', () => {
    let props = {
      starRating: 3.5
    };
    render(<Average {...props}/>);
  });
  test('Styles', () => {
    let props = {
      metaData: {}
    };
    render(<Styles {...props}/>);
  });
  test('StarList', () => {
    let props = {
      metaData: {},
      updateFilter: () => {},
      currentFilter: []
    };
    render(<StarList {...props}/>);
  });
  test('List', () => {
    let props = {
      productID: 32847,
      currentFilter: []
    };
    render(<List {...props}/>);
  });
  test('Sort', () => {
    let props = {
      updateSort: () => {},
      numReviews: 6
    };
    render(<Sort {...props}/>);
  });
  test('Tile', () => {
    let props = {
      key: 1,
      review: {
        date: '2019-06-23T00:00:00.000Z'
      }
    };
    render(<Tile {...props}/>);
  });
  test('Buttons', () => {
    let props = {
      updateLength: () => {},
      listMaxed: false
    };
    render(<Buttons {...props}/>);
  });
});

describe('Average Score Component', () => {
  test('Component renders passed in score value', () => {
    let component = render(<Average starRating='3.5'/>);
    let result = component.container.firstElementChild.textContent;
    expect(result).toBe('Average Rating: 3.5');
  });
});

describe('Reviews Tile', () => {

  let review = {
    'review_id': 1116184,
    rating: 4,
    'reviewer_name': 'bigbrotherbenjamin',
    date: '2019-06-23T00:00:00.000Z',
    summary: 'I am liking these glasses',
    body: 'They are very dark. But that\'s good because I\'m in very sunny spots',
    recommend: true,
    response: 'Glad you\'re enjoying the product!',
    helpfulness: 32,
    photos: []
  };

  test('Component renders', () => {
    let component = render(<Tile review={review}/>);
    let result = component.container.firstElementChild.firstElementChild.innerHTML;
    expect(result).toBe('<span>Rating: 4</span>');
  });
});