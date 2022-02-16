import React from 'react';
import ImageCarousel from './imageGallery/imagesCarousel.jsx';
import Information from './productInformation/information.jsx';
import StyleSelector from './styleSelector/styleSelector.jsx';
import Cart from './addToCart/cart.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: this.props.styles.results[0],
      mainPhotoIndex: 0,
      photos: this.props.styles.results[0].photos
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
    this.setState({ selectedStyle: this.props.styles.results[index], mainPhotoIndex: 0 });
  }

  changeSelectedPhoto(e) {
    let index = e.target.id;
    this.setState({
      mainPhotoIndex: Number(index)
    });
  }

  render() {
    return (
      <div>
        <ImageCarousel changePhoto={this.changeSelectedPhoto.bind(this)} mainPhotoIndex={this.state.mainPhotoIndex} photos={this.state.selectedStyle.photos} selectedStyle={this.state.selectedStyle}/>
        <Information product={this.props.product} selectedStyle={this.state.selectedStyle} starRating={this.props.starRating}/>
        <StyleSelector changeStyle={this.changeSelectedStyle.bind(this)} name={this.state.selectedStyle.name} styles={this.props.styles}/>
        <Cart addToMyOutfit={this.props.addToMyOutfit} selectedStyle={this.state.selectedStyle}/>
      </div>
    );
  }
}


export default ProductOverview;