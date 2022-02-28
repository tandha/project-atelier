// import React from 'react';
import React, { useState, useEffect } from 'react';
import Thumbnails from './imageThumbnails.jsx';
import { IoMdArrowBack, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPhotoIndex: 0,
      mainPhoto: this.props.selectedStyle.photos[0],
      thumbnailIndex: 4,
      photos: this.props.selectedStyle.photos,
      thumbnailSlice: [
        this.props.selectedStyle.photos[0],
        this.props.selectedStyle.photos[1],
        this.props.selectedStyle.photos[2],
        this.props.selectedStyle.photos[3],
        this.props.selectedStyle.photos[4]
      ],
      expandedView: false
    };
    this.changeSelectedPhoto = this.changeSelectedPhoto.bind(this);
    this.handleLeftArrow = this.handleLeftArrow.bind(this);
    this.handleRightArrow = this.handleRightArrow.bind(this);
    this.advanceMainPhoto = this.advanceMainPhoto.bind(this);
    this.handleUpArrow = this.handleUpArrow.bind(this);
    this.handleDownArrow = this.handleDownArrow.bind(this);
    this.expandedView = this.expandedView.bind(this);
    this.collapsedView = this.collapsedView.bind(this);
  }

  componentDidMount() {
    //If expandedView is true
    //Need to render modal
    if (this.state.expandedView) {
      this.displayModal();
    }
  }

  changeSelectedPhoto(e) {
    let index;
    let srcId = this.findImageId(e.target.src);
    this.state.photos.forEach((image, i) => {
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

  advanceThumbnails() {
    let copyState = this.state.photos.slice(0);
    let visibleThumbnails = copyState.splice(this.state.thumbnailIndex, 5);
    this.setState({ thumbnailSlice: visibleThumbnails, thumbnailIndex: this.state.thumbnailIndex + 1 });
  }

  reverseThumbnails(num) {
    let copyState = this.state.photos.slice(0);
    let visibleThumbnails = copyState.splice(this.state.thumbnailIndex - 2, 5);
    this.setState({ thumbnailSlice: visibleThumbnails, thumbnailIndex: this.state.thumbnailIndex - 1 });
  }

  handleLeftArrow () {
    let mainId = this.findImageId(this.state.photos[this.state.mainPhotoIndex].url);
    let thumbnailId = this.findImageId(this.state.thumbnailSlice[0].url);
    if (mainId === thumbnailId) {
      this.reverseThumbnails();
    }
    this.reverseMainPhoto();
  }

  handleRightArrow () {
    let mainId = this.findImageId(this.state.photos[this.state.mainPhotoIndex].url);
    let thumbnailId = this.findImageId(this.state.thumbnailSlice[this.state.thumbnailSlice.length - 1].url);
    if (mainId === thumbnailId) {
      this.advanceThumbnails();
    }
    this.advanceMainPhoto();
  }

  handleDownArrow (e) {
    this.advanceThumbnails();
  }

  handleUpArrow (e) {
    this.reverseThumbnails();
  }

  expandedView(e) {
    this.setState({ expandedView: true});
  }
  collapsedView(e) {
    this.setState({ expandedView: false});
  }

  render() {
    return (
      this.state.expandedView ?
        <div id='expanded-view-modal'>
          <span onClick={this.collapsedView}>x</span>
          <div id='expanded-image-container'>
            <img src={this.state.mainPhoto.url}></img>
          </div>
        </div> :
        <div id='image-gallery'>
          {this.state.mainPhotoIndex !== 0 &&
          <BsArrowLeftCircleFill
            id='image-gallery-left-arrow'
            onClick={this.handleLeftArrow}/>}
          {this.state.mainPhotoIndex !== this.state.photos.length - 1 &&
          <BsArrowRightCircleFill
            id='image-gallery-right-arrow'
            onClick={this.handleRightArrow} />}
          <img data-testid="main-image" id='main-image' onClick={this.expandedView} src={this.state.photos[this.state.mainPhotoIndex].url}></img>
          <Thumbnails
            photos={this.state.thumbnailSlice}
            mainPhotoUrl={this.state.photos[this.state.mainPhotoIndex].thumbnail_url}
            mainIndex={this.state.mainPhotoIndex}
            changePhoto={this.changeSelectedPhoto}/>
          {this.findImageId(this.state.thumbnailSlice[0].url) !== this.findImageId(this.state.photos[0].url) && <IoIosArrowUp
            onClick={this.handleUpArrow}
            id='thumbnail-gallery-up-arrow'/>}
          {this.state.thumbnailSlice[this.state.thumbnailSlice.length - 1] !== this.state.photos[this.state.photos.length - 1] &&
          <IoIosArrowDown
            onClick={this.handleDownArrow}
            id='thumbnail-gallery-down-arrow'/>}
        </div>
    );

  }
}

export default ImageCarousel;
