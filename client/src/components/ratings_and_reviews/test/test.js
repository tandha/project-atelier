import React from 'react';
import { render, screen } from '@testing-library/react';
import List from '../reviews-list/list.jsx';
import Tile from '../reviews-list/tile.jsx';
import Average from '../rating-breakdown/average.jsx';
import Breakdown from '../rating-breakdown/breakdown.jsx';

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