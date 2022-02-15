import React from 'react';
import { render, screen } from '@testing-library/react';
import RelatedItemsOutfitCreation from '../related_items&outfit.jsx';

describe('Related Items & Outfit Creation', () => {
  test('Successfully renders main RIAO component to page', () => {
    render(<RelatedItemsOutfitCreation />);
    screen.debug();
  });
});