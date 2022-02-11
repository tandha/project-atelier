import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductOverview from '../overview.jsx';

describe('ProductOverview', () => {
  test('Renders Product Overview component', () => {
    render(<ProductOverview />);
    screen.debug();
  });
});