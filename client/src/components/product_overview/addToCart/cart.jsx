import React from 'react';
import Option from './option.jsx';
import { IoIosStarOutline, IoIosStar} from 'react-icons/io';


class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableSizes: [],
      availableQuantities: [],
      selectedSize: 'tbd',
      selectedQuantity: 'tbd',
    };
  }

  componentDidMount() {
    this.setAvailableSizes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedStyle !== this.props.selectedStyle) {
      this.setAvailableSizes();
      this.resetForm();
    }
  }


  resetForm() {
    document.getElementById('cart-form').reset();
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

  determineQuantityFromSelectedSize() {
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
      this.determineQuantityFromSelectedSize();
    } );
  }

  setQuantitySelection(e) {
    let selectedQuantity = e.target.value;
    this.setState( {selectedQuantity} );
  }

  handleAddToMyOutfit() {
    console.log(this.props);
    this.props.toggleOutfit(this.props.productId);
  }

  addToCart(e) {
    //TODO: POST the selected size (but not quantity?) to the API
    e.preventDefault();
    console.log('size', this.state.selectedSize, 'qty', this.state.selectedQuantity);
    this.resetForm();
  }

  render() {
    return (
      <div id='cart'>
        <form id='cart-form' onSubmit={this.addToCart.bind(this)}>
          <div id='select-size'>
            <select onChange={this.setSizeSelection.bind(this)} >
              <option>SELECT SIZE</option>
              {
                this.state.availableSizes.map((size, i) => {
                  return <Option key={i} option={size}/>;
                })
              }
            </select>

          </div>
          <div id='select-quantity'>
            <select onChange={this.setQuantitySelection.bind(this)}>
              <option>-</option>
              {
                this.state.availableQuantities.map((qty) => {
                  return <Option key={qty} option={qty}/>;
                })
              }
            </select>

          </div>
          <div id='add-to-bag'>
            <button>ADD TO BAG</button>
            <span> + </span>
          </div>
          <div id='add-to-myoutfit'>
            {
              this.props.currentProductInOutfit === false ?
                <span onClick={this.handleAddToMyOutfit.bind(this)}><IoIosStarOutline /></span> :
                <span onClick={this.handleAddToMyOutfit.bind(this)}><IoIosStar /></span>
            }
          </div>
        </form>
      </div>
    );
  }
}

export default Cart;

