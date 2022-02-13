import React from 'react';
import ImageCarousel from './imagesCarousel.jsx';
import Information from './information.jsx';
import StyleSelector from './styleSelector.jsx';
import Cart from './cart.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: this.props.styles.results[0]
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
    this.setState({ selectedStyle: this.props.styles.results[index] });
  }

  render() {
    return (
      <div>
        <ImageCarousel photos={this.state.selectedStyle.photos}/>
        <Information product={this.props.product} selectedStyle={this.state.selectedStyle} starRating={this.props.starRating}/>
        <StyleSelector changeStyle={this.changeSelectedStyle.bind(this)} name={this.state.selectedStyle.name} styles={this.props.styles}/>
        <Cart addToMyOutfit={this.props.addToMyOutfit} sku={this.state.selectedStyle.sku}/>
      </div>
    );
  }
}


export default ProductOverview;