import React from 'react';
import { render, screen } from '@testing-library/react';
import data from '../../../sampleData/sampleData.js';
import ProductOverview from '../overview.jsx';
import ImagesCarousel from '../imageGallery/imagesCarousel.jsx';
import Information from '../productInformation/information.jsx';
import FeatureInformation from '../productInformation/featureInformation.jsx';
import StyleSelector from '../styleSelector/styleSelector.jsx';
import StyleThumbnail from '../styleSelector/StyleThumbnail.jsx';
import Cart from '../addToCart/cart.jsx';
import Option from '../addToCart/option.jsx';

describe('Overview Widget Components Render', () => {
  test('Renders Main Image', () => {
    let props = {
      photos: data.styles.results[0].photos,
      mainPhotoIndex: 0,
      changePhoto: function(e) { return e; }
    };
    render(<ImagesCarousel {...props}/>);
    //TODO: expect an element with an id of main-image to exist
  });
  test('Renders Thumbnails', () => {
    let props = {
      photos: data.styles.results[0].photos,
      mainPhotoIndex: 0,
      changePhoto: function(e) { return e; }
    };
    render(<ImagesCarousel {...props}/>);
    //TODO: expect x number of children rendered to page
    //TODO: expect selecting a thumbnail to change main image
    //TODO: expect selecting a thumbnail to remove image clicked from thumbnails list
  });
  test('Renders Product Information', () => {
    let props = {
      product: data.product,
      selectedStyle: data.styles.results[0]
    };
    render(<Information {...props}/>);
    //TODO: expect an elements with the ids of x to exist
  });
  test('Renders Product Features', () => {
    let props = {
      features: data.product.features,
    };
    render(<FeatureInformation {...props}/>);
    //TODO: expect x number of elements to exist
  });
  test('Renders Style Selector', () => {
    let props = {
      name: data.styles.results[0].name,
      styles: data.styles,
      changeStyle: function(e) { return e; }
    };
    render(<StyleSelector {...props}/>);
    //TODO: expect style name to exist
    //TODO: expect x number of styles to exist
    //TODO: expect selecting style to change main image
  });
  test('Renders Cart', () => {
    let props = {
      selectedStyle: data.styles.results[0]
    };
    render(<Cart {...props}/>);
    //TODO: expect selected size to exist in DOM
    //TODO: expected selected quantity to exist in DOM
    //TODO: expect cliking 'add to bag' to
    //TODO: expect clicking 'add to bag' to reset form
    //TODOP expect clicking a different style to reset form
  });
  test('Renders Product Overview', () => {
    let props = {
      product: data.product,
      styles: data.styles
    };
    render(<ProductOverview {...props}/>);

  });
});
