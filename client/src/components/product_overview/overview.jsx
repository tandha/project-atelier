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
      photos: this.props.styles.results[0].photos,
      thumbnailSlice: []
    };
  }

  componentDidMount() {
    this.setState({ thumbnailSlice: this.updateVisibleThumbnails(0)});
  }

  updateVisibleThumbnails(num) {
    let copyState = this.state.selectedStyle.photos.slice(0);
    let visibleThumbnails = copyState.splice(this.state.mainPhotoIndex + 1, 5);
    return visibleThumbnails;
  }

  changeSelectedStyle(e) {
    let index;
    let id = Number(e.target.getAttribute('id'));
    this.props.styles.results.forEach((item, i) => {
      if (item.style_id === id) {
        index = i;
      }
    });
    this.setState({ selectedStyle: this.props.styles.results[index]});
  }

  changeSelectedPhoto(e) {
    let index = e.target.id;
    this.setState({
      mainPhotoIndex: Number(index)
    });
  }

  advanceMainPhoto() {
    this.state.mainPhotoIndex === this.state.photos.length - 1 ? this.setState({ mainPhotoIndex: 0}) : this.setState({ mainPhotoIndex: this.state.mainPhotoIndex + 1});
  }

  reverseMainPhoto() {
    this.state.mainPhotoIndex === 0 ? this.setState({ mainPhotoIndex: this.state.photos.length - 1}) : this.setState({ mainPhotoIndex: this.state.mainPhotoIndex - 1});
  }

  render() {
    return (
      this.state.thumbnailSlice.length > 0 &&
      <div id='overview-container'>
        <ImageCarousel reverseMainPhoto={this.reverseMainPhoto.bind(this)} advanceMainPhoto={this.advanceMainPhoto.bind(this)} changePhoto={this.changeSelectedPhoto.bind(this)} mainPhotoIndex={this.state.mainPhotoIndex} photos={this.state.thumbnailSlice} selectedStyle={this.state.selectedStyle}/>
        <Information product={this.props.product} selectedStyle={this.state.selectedStyle} starRating={this.props.starRating}/>
        <StyleSelector changeStyle={this.changeSelectedStyle.bind(this)} name={this.state.selectedStyle.name} styles={this.props.styles}/>
        <Cart productId={this.props.product.id} toggleOutfit={this.props.toggleOutfit} currentProductInOutfit={this.props.currentProductInOutfit} selectedStyle={this.state.selectedStyle}/>
      </div>
    );
  }
}


export default ProductOverview;