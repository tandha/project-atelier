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
      mainPhoto: this.props.styles.results[0].photos[0],
      thumbnailIndex: 0,
      photos: this.props.styles.results[0].photos,
      thumbnailSlice: []
    };
  }

  componentDidMount() {
    this.advanceVisibleThumbnails();
    // this.setState({ mainPhoto: this.state.selectedStyle.photos.url});
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
      mainPhotoIndex: 0,
      thumbnailIndex: 0}, () => {
      this.advanceVisibleThumbnails();
    });
  }

  changeSelectedPhoto(e) {
    let index;
    let srcId = this.findImageId(e.target.src);
    this.state.selectedStyle.photos.forEach((image, i) => {
      let imgId = this.findImageId(image.url);
      if (imgId === srcId) {
        index = i;
        return;
      }
    });
    this.setState({
      mainPhotoIndex: Number(index)
    });
  }

  findImageId(img) {
    let start = img.indexOf('-');
    let end = img.indexOf('?') + 1;
    return img.slice(start, end);
  }

  advanceMainPhoto() {
    this.state.mainPhotoIndex === this.state.photos.length - 1 ? this.setState({ mainPhotoIndex: 0}) : this.setState({ mainPhotoIndex: this.state.mainPhotoIndex + 1});
  }

  reverseMainPhoto() {
    this.state.mainPhotoIndex === 0 ? this.setState({ mainPhotoIndex: this.state.photos.length - 1}) : this.setState({ mainPhotoIndex: this.state.mainPhotoIndex - 1});
  }

  advanceVisibleThumbnails() {
    let copyState = this.state.selectedStyle.photos.slice(0);
    let visibleThumbnails = copyState.splice(this.state.thumbnailIndex, 5);
    this.setState({ thumbnailSlice: visibleThumbnails, thumbnailIndex: this.state.thumbnailIndex + 1 });
  }

  reverseVisibleThumbnails(num) {
    let copyState = this.state.selectedStyle.photos.slice(0);
    let visibleThumbnails = copyState.splice(this.state.thumbnailIndex - 2, 5);
    this.setState({ thumbnailSlice: visibleThumbnails, thumbnailIndex: this.state.thumbnailIndex - 1 });
  }

  render() {
    return (
      this.state.thumbnailSlice.length > 0 &&
      <div id='overview-container'>
        <ImageCarousel
          advanceMainPhoto={this.advanceMainPhoto.bind(this)}
          changePhoto={this.changeSelectedPhoto.bind(this)}
          advanceThumbnails={this.advanceVisibleThumbnails.bind(this)}
          reverseThumbnails={this.reverseVisibleThumbnails.bind(this)}
          reverseMainPhoto={this.reverseMainPhoto.bind(this)}
          mainPhotoIndex={this.state.mainPhotoIndex}
          mainPhoto={this.state.mainPhoto}
          photos={this.state.selectedStyle.photos}
          selectedStyle={this.state.selectedStyle}
          thumbnailPhotos={this.state.thumbnailSlice}
        />
        <Information
          product={this.props.product}
          selectedStyle={this.state.selectedStyle}
          starRating={this.props.starRating}
        />
        <StyleSelector
          changeStyle={this.changeSelectedStyle.bind(this)}
          name={this.state.selectedStyle.name}
          styles={this.props.styles}
        />
        <Cart
          currentProductInOutfit={this.props.currentProductInOutfit}
          productId={this.props.product.id}
          selectedStyle={this.state.selectedStyle}
          toggleOutfit={this.props.toggleOutfit}
        />
      </div>
    );
  }
}


export default ProductOverview;