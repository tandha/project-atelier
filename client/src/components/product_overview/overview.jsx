import React from 'react';
import ImageCarousel from './imageGallery/imagesCarousel.jsx';
import Information from './productInformation/information.jsx';
import StyleSelector from './styleSelector/styleSelector.jsx';
import Cart from './addToCart/cart.jsx';
import Feature from './productInformation/featureInformation.jsx';
import Description from './productInformation/descriptionSlogan.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: this.props.styles.results[0],
    };
  }

  changeSelectedStyle(e) {
    let index;
    let id = Number(e.target.getAttribute('id'));
    this.props.styles.results.forEach((item, i) => {
      if (item.style_id === id) {
        index = i;
      }
    });
    this.setState({
      selectedStyle: this.props.styles.results[index],
    });
  }

  render() {
    return (
      <div id='overview-container'>
        <ImageCarousel
          selectedStyle={this.state.selectedStyle}
        />
        <Information
          product={this.props.product}
          selectedStyle={this.state.selectedStyle}
          starRating={this.props.starRating}
        />
        <StyleSelector
          changeStyle={this.changeSelectedStyle.bind(this)}
          styles={this.props.styles}
          selectedStyle={this.state.selectedStyle}
        />
        <Cart
          currentProductInOutfit={this.props.currentProductInOutfit}
          productId={this.props.product.id}
          selectedStyle={this.state.selectedStyle}
          toggleOutfit={this.props.toggleOutfit}
        />
        <Description product={this.props.product} />
        <Feature features={this.props.product.features}/>
      </div>
    );
  }
}


export default ProductOverview;