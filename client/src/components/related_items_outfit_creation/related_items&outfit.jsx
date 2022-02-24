import React from 'react';
import axios from 'axios';
import RelatedItems from './related-list.jsx';
import MyOutfits from './outfit-list.jsx';

class RelatedItemsAndMyOutfits extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      relatedItemsData: [],
      myOutfitsData: []
    };
  }

  componentDidMount() {
    this.generateRelatedItemsData()
      .then((res) => {
        this.setState({ relatedItemsData: res });
      })
      .then(() => {
        // generateMyOufitsData()
      })
      .catch(() => {

      });
  }

  getRelatedItems() {
    return axios({
      method: 'get',
      url: 'products/' + this.props.product.id + '/related'
    });
  }

  getProductInfo(id) {
    return axios({
      method: 'get',
      url: 'products/' + id
    })
      .then((res) => {
        let item = {};
        item.id = id;
        item.name = res.data.data.name;
        item.category = res.data.data.category;
        return item;
      })
      .catch((err) => {
        console.log('Error Getting Product Info', err);
      });
  }

  getStyleInfo(product) {
    return axios({
      method: 'get',
      url: 'products/' + product.id + '/styles',
    })
      .then((res) => {
        let results = res.data.data.results[0];
        product.sale = results.sale_price;
        product.price = results.original_price;
        product.image = results.photos[0].thumbnail_url;
        return product;
      })
      .catch((err) => {
        console.log('Error Getting Style Info', err);
      });
    return product;
  }

  addProductInfo(ids) {
    let relatedItemsPromises = ids.map((id) => {
      let productInfoAdded = this.getProductInfo(id);
      return productInfoAdded;
    });
    return Promise.all(relatedItemsPromises);
  }

  addStyleInfo(products) {
    let relatedItemsPromises = products.map((product) => {
      let styleInfoAdded = this.getStyleInfo(product);
      return styleInfoAdded;
    });
    return Promise.all(relatedItemsPromises);
  }

  generateRelatedItemsData() {
    return this.getRelatedItems()
      .then((res) => {
        return this.addProductInfo(res.data.data);
      })
      .then((res) => {
        return this.addStyleInfo(res);
      })
      .catch((err) => {
        console.log('Error Generating Related Items Data', err);
      });
  }

  generateMyOufitsData() {
    //TODO: look through my oufits, for each outfit, collect a axios promise and return Promise.all()
    console.log(this.props.myOutfits);
  }




  render() {
    return (
      <div>
        <div>
          <RelatedItems toggleOutfit={this.props.toggleOutfit} relatedItems={this.state.relatedItemsData}/>
        </div>
        <div>
          <h4>Your Outfit</h4>
          <MyOutfits />
        </div>
      </div>
    );
  }


}

export default RelatedItemsAndMyOutfits;