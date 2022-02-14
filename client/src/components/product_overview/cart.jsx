import React from 'react';
import Option from './option.jsx';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: this.props.selectedStyle,
      availableSizes: [],
      availableQuantities: [],
      selectedSize: 'tbd',
      selectedQuantity: 'tbd'
    };
  }

  componentDidMount() {
    this.setAvailableSizes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedStyle !== this.props.selectedStyle) {
      this.setAvailableSizes();
    }
  }

  setAvailableSizes() {
    let skus = this.props.selectedStyle.skus;
    let sizes = [];
    let quantities = [];
    for (let key in skus) {
      sizes.push(skus[key].size);
    }
    this.setState({ availableSizes: sizes } );
    return sizes;
  }

  determineQuantity() {
    let skus = this.props.selectedStyle.skus;
    let quantities = [];
    for (let key in skus) {
      if (skus[key].size === this.state.selectedSize) {
        for (var i = 1; i <= skus[key].quantity; i++) {
          if (i > 15) {
            return this.setAvailableQuantities(quantities);
          }
          quantities.push(i);
        }
      }
    }
    this.setAvailableQuantities(quantities);
  }

  setAvailableQuantities(quantities) {
    this.setState({ availableQuantities: quantities} );
  }

  setSizeSelection(e) {
    let selectedSize = e.target.value;
    this.setState( {selectedSize}, () => {
      //Once a size has been selected quantity can be generated
      this.determineQuantity();
    } );
  }

  setQuantitySelection(e) {
    let selectedQuantity = e.target.value;
    this.setState( {selectedQuantity} );
  }

  addToCart(e) {
    //TODO: POST the selected size (but not quantity?) to the API
    e.preventDefault();
    console.log('size', this.state.selectedSize, 'qty', this.state.selectedQuantity);
  }

  //TODO: Reset form values after submit button
  //TODO: Reset form values after different style has been selected
  render() {
    return (
      <div>
        <form onSubmit={this.addToCart.bind(this)}>
          <select onChange={this.setSizeSelection.bind(this)} id='select-size'>
            <option>Select Size</option>
            {
              this.state.availableSizes.map((size) => {
                return <Option key={size} option={size}/>;
              })
            }
          </select>
          <select onChange={this.setQuantitySelection.bind(this)}id='select-quantity'>
            <option>-</option>
            {
              this.state.availableQuantities.map((qty) => {
                return <Option key={qty} option={qty}/>;
              })
            }
          </select>
          <button>Add To Bag</button>
        </form>
      </div>
    );
  }
}

export default Cart;

