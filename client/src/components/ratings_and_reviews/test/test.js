import React from 'react';
import { render, screen } from '@testing-library/react';
import Average from '../rating-breakdown/average.jsx';
import Breakdown from '../rating-breakdown/breakdown.jsx';

describe('Average Score Component', () => {
  test('Component renders passed in score value', () => {
    let component = render(<Average starRating='3.5'/>);
    let result = component.container.firstElementChild.textContent;
    expect(result).toBe('3.5');
  });
});