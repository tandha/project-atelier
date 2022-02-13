import React from 'react';
import ImageCarousel from './ImageCarousel.jsx';
import Information from './information.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: {}
    };
  }

  componentDidMount() {
    this.setState({
      selectedStyle: this.props.styles.results[0]
    });
  }

  render() {
    return (
      <div>
        <ImageCarousel photos={this.state.selectedStyle.photos}/>
        <Information product={this.props.product} selectedStyle={this.state.selectedStyle}/>
      </div>
    );
  }
}


export default ProductOverview;