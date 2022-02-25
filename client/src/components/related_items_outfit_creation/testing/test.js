import React from 'react';
import { render, screen } from '@testing-library/react';
import data from '../../../sampleData/sampleData.js';
import RelatedItemsAndOutfit from '../related_items&outfit.jsx';
import RelatedItems from '../related-list.jsx';
import RelatedItem from '../relatedItem.jsx';
import MyOutfits from '../outfit-list.jsx';
import MyOutfit from '../myOutfit.jsx';

describe('Related Items & My Outfits Widget Components Render', () => {
  test('Successfully Renders Related Items Component', () => {
    let props = {
      relatedItems: [],
      starRating: 0,
      toggleOutfit: () => {}
    };
    render(<RelatedItems {...props}/>);

  });
  test('Successfully renders Related Item Component', () => {
    let props = {
      relatedItem: {
        id: 1,
        name: 'Name',
        category: 'Category',
        price: '100',
        image: data.styles.results[0].photos[0].url
      },
      starRating: 0,
      toggleOutfit: () => {}
    };
    render(<RelatedItem {...props}/>);
  });
  test('Successfully renders My Outfits Component', () => {
    let props = {
      myOutfits: [],
      starRating: 0,
      toggleOutfit: () => {}
    };
    render(<MyOutfits {...props}/>);
  });
  test('Successfully renders My Outfit Component', () => {
    let props = {
      outfit: {
        id: 1,
        name: 'Name',
        category: 'Category',
        price: '100',
        image: data.styles.results[0].photos[0].url
      },
      starRating: 0,
      toggleOutfit: () => {}
    };
    render(<MyOutfit {...props}/>);
  });
  test('Successfully renders Related Items & My Outfit Component', () => {
    let props = {
      product: {
        id: 1,
        name: 'Name',
        category: 'Category',
        price: '100',
        image: data.styles.results[0].photos[0].url
      },
      myOutfits: [1, 2, 3],
      starRating: 0,
      toggleOutfit: () => {}
    };
    render(<RelatedItemsAndOutfit {...props}/>);
  });
});
