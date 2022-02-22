import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
  test('Renders Image Gallery', () => {
    let props = {
      photos: data.styles.results[0].photos,
      mainPhotoIndex: 0,
      changePhoto: function(e) { return e; }
    };
    render(<ImagesCarousel {...props}/>);
  });
  test('Renders Product Information', () => {
    let props = {
      product: data.product,
      selectedStyle: data.styles.results[0]
    };
    render(<Information {...props}/>);

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

describe('Image Gallery Component', () => {
  test('Renders Main Image', () => {
    let props = {
      photos: data.styles.results[0].photos,
      mainPhotoIndex: 0,
      changePhoto: function(e) { return e; }
    };
    render(<ImagesCarousel {...props}/>);
    const image = screen.getByTestId('main-image');
    expect(image).toHaveAttribute('src', props.photos[0].url);
  });

  test('Renders Correct Number of Thumbnails', () => {
    let props = {
      photos: data.styles.results[0].photos,
      mainPhotoIndex: 0,
      changePhoto: function(e) { return e; }
    };
    const { getAllByRole } = render(<ImagesCarousel {...props}/>);
    const thumbnailList = getAllByRole('listitem');
    expect(thumbnailList).toHaveLength(3);
  });
  //TODO: expect thumbnails to be images
  //TODO: expect selecting a thumbnail to change main image that that thumbnail's corresponding url
});

describe('Product Information Component', () => {
  let props = {
    product: {
      name: 'Kai Onesie',
      slogan: 'Best onsie ever',
      description: 'It is a onsie',
      category: 'Clothes',
      features: [{feature: 'fabric', value: '100% cotton'}, {feature: 'Care', value: 'Machine Wash'}]
    },
    selectedStyle: data.styles.results[0]
  };
  test('Renders Product Information Properties to the Screen', () => {
    render(<Information {...props}/>);
    expect(screen.getByText('Kai Onesie')).toBeInTheDocument();
    expect(screen.getByText('Best onsie ever')).toBeInTheDocument();
    expect(screen.getByText('It is a onsie')).toBeInTheDocument();
    expect(screen.getByText('Clothes')).toBeInTheDocument();
  });
  test('Dynamically Renders Product Features', () => {
    render(<Information {...props}/>);
    props.product.features.forEach((feature) => {
      let formattedFeature = `${feature.feature}: ${feature.value}`;
      expect(screen.getByText(formattedFeature)).toBeInTheDocument();
    });

  });

  //TODO: renders star svgs
  //TODO: add to outfit button works
});
