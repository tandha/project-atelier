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
      availableSizes: ['small', 'medium', 'large'],
      quantity: [1, 2, 3, 4, 5],
      selectedSize: '',
      selectedQuantity: 0
    };
  }

  generateSizeOptions() {
    //TODO: Pulls the sizes available from the selectedStyle's sku objects
  }

  renderSizes() {
    //TODO: Renders the sizes from this.state.availableSizes as the options to 'select-size'
  }

  setSizeSelection(e) {
    let selectedSize = e.target.value;
    this.setState( {selectedSize} );
  }

  determineQuantity() {
    //TODO: Pulls the quantity available given the selected Size and adds each number to this.state.quantity
  }

  renderQuantity() {
    //TODO: Renders the quantity options from this.state.quantity (up to 15)
  }

  setQuantitySelection(e) {
    let selectedQuantity = e.target.value;
    this.setState( {selectedQuantity} );
  }

  addToCart(e) {
    e.preventDefault();
    console.log('size', this.state.selectedSize, 'qty', this.state.selectedQuantity);
    //TODO: POST the selected size (but not quantity?) to the API
  }

  //TODO: Dynamically render the options for available sizes
  //TODO: Dynamically render the options for quantity (up to 15)
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
              this.state.quantity.map((qty) => {
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

