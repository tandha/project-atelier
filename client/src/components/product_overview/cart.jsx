import React from 'react';
import Option from './option.jsx';

//Data Shape selectedStyle
//   'skus': {
//     '37': {
//       'quantity': 8,
//       'size': 'XS'
//     },
//     '38': {
//       'quantity': 16,
//       'size': 'S'
//     },
//     '39': {
//       'quantity': 17,
//       'size': 'M'
//     },
//   }
// }

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableSizes: [],
      availableQuantities: [],
      selectedSize: 'tbd',
      selectedQuantity: 'tbd'
    };
  }

  componentDidMount() {
    this.initializeSizes();
  }

  initializeSizes() {
    let sizes = [];
    let quantities = [];
    for (let key in this.props.skus) {
      sizes.push(this.props.skus[key].size);
    }
    this.setState({ availableSizes: sizes } );
  }

  determineQuantity() {
    let quantities = [];
    for (let key in this.props.skus) {
      if (this.props.skus[key].size === this.state.selectedSize) {
        for (var i = 0; i <= this.props.skus[key].quantity; i++) {
          if (i > 15) {
            return this.initializeQuantities(quantities);
          }
          quantities.push(i);
        }
      }
    }
    this.initializeQuantities(quantities);
  }

  initializeQuantities(quantities) {
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
  render() {
    return (
      <div>
        <form onSubmit={this.addToCart.bind(this)}>
          <select onChange={this.setSizeSelection.bind(this)} id='select-size'>
            <option>Select Size</option>
            {
              this.state.availableSizes.map((size) => {
                return <Option option={size}/>;
              })
            }
          </select>
          <select onChange={this.setQuantitySelection.bind(this)}id='select-quantity'>
            <option>-</option>
            {
              this.state.availableQuantities.map((qty) => {
                return <Option option={qty}/>;
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

