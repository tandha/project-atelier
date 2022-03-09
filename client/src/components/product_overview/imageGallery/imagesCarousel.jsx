// import React from 'react';
import React, { useState, useEffect } from 'react';
import Thumbnails from './imageThumbnails.jsx';
import { IoMdArrowBack, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPhotoIndex: 0,
      thumbnailIndex: 0,
      photos: this.props.selectedStyle.photos,
      thumbnailSlice: [
        this.props.selectedStyle.photos[0],
      ],
      expandedView: false,
      zoomView: false,
      mouseX: 0,
      mouseY: 0
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
    let thumbnailSlice;
    this.state.photos.length < 5 ? this.setState({ thumbnailSlice: this.state.photos }) : this.setState({ thumbnailSlice: this.state.photos.slice(0, 5)});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedStyle !== this.props.selectedStyle) {
      this.setState({
        mainPhotoIndex: prevState.mainPhotoIndex,
        thumbnailIndex: prevState.thumbnailIndex,
        photos: this.props.selectedStyle.photos,
        thumbnailSlice: prevState.photos.slice(0, 5),
        expandedView: false
      }, () => {
        this.advanceThumbnails(prevState.mainPhotoIndex - prevState.thumbnailIndex);
      });
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

  advanceThumbnails(incrementer) {
    let copyState = this.state.photos.slice(0);
    let visibleThumbnails = copyState.splice(this.state.thumbnailIndex + incrementer, 5);
    this.setState({ thumbnailSlice: visibleThumbnails, thumbnailIndex: this.state.thumbnailIndex + incrementer });
  }

  reverseThumbnails(decrementer) {
    let copyState = this.state.photos.slice(0);
    let visibleThumbnails = copyState.splice(this.state.thumbnailIndex - decrementer, 5);
    this.setState({ thumbnailSlice: visibleThumbnails, thumbnailIndex: this.state.thumbnailIndex - decrementer });
  }

  handleLeftArrow () {
    let mainId = this.findImageId(this.state.photos[this.state.mainPhotoIndex].url);
    let thumbnailId = this.findImageId(this.state.thumbnailSlice[0].url);
    if (mainId === thumbnailId) {
      this.reverseThumbnails(1);
    }
    this.reverseMainPhoto();
  }

  handleRightArrow () {
    let mainId = this.findImageId(this.state.photos[this.state.mainPhotoIndex].url);
    let thumbnailId = this.findImageId(this.state.thumbnailSlice[this.state.thumbnailSlice.length - 1].url);
    if (mainId === thumbnailId) {
      this.advanceThumbnails(1);
    }
    this.advanceMainPhoto();
  }

  handleDownArrow (e) {
    this.advanceThumbnails(1);
  }

  handleUpArrow (e) {
    this.reverseThumbnails(1);
  }

  expandedView(e) {
    this.setState({ expandedView: true});
  }

  collapsedView(e) {
    this.setState({ expandedView: false});
  }

  toggleExpand(e) {
    let image = e.target;
    this.setState({ zoomView: !this.state.zoomView }, () => {
      if (this.state.zoomView) {
        document.getElementById('expanded-image-container').id = 'zoom-image-container';
        this.enterZoomMode();
      } else {
        document.getElementById('zoom-image-container').id = 'expanded-image-container';
        this.setState({ expandedView: false });
      }
    });
  }

  enterZoomMode() {
    if (this.state.expandedView) {
      let container = document.getElementById('zoom-image-container');

      container.onmousemove = (e) => {
        let image = document.getElementById('expanded-image');
        let xPos = e.clientX;
        let yPos = e.clientY;
        let containerHeight = 1000; //will always be this high
        // let containerWidth = window.innerWidth;
        let containerWidth = 1500; //need to get window width

        let percentHeight = (xPos - containerWidth);
        let percentWidth = (yPos - containerHeight);

        image.style.top = percentWidth + 'px';
        image.style.left = percentHeight + 'px';
      };

    }
  }

  render() {
    return (
      this.state.expandedView ?
        <div id='expanded-view-modal'>
          <div id='expanded-image-container'>
            <img id='expanded-image'
              onClick={this.toggleExpand.bind(this)}src={this.state.photos[this.state.mainPhotoIndex].url}>
            </img>
            {!this.state.zoomView &&
            <div>
              <span onClick={this.collapsedView}><AiOutlineClose id='expand-view-close'/></span>
              {this.state.mainPhotoIndex !== 0 &&
              <BsArrowLeftCircleFill
                id='image-gallery-left-arrow'
                onClick={this.handleLeftArrow}/>}
              {this.state.mainPhotoIndex !== this.state.photos.length - 1 &&
            <BsArrowRightCircleFill
              id='image-gallery-right-arrow'
              onClick={this.handleRightArrow} />}
              <Thumbnails
                expandedView={this.state.expandedView}
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
            </div> }
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

let zoomPanTranslate;