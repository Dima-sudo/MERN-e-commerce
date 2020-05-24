import React, { Component } from "react";

import { connect } from "react-redux";
import { getProducts, getLaptops } from "../Redux/Actions/ProductActions";
import toggleFetching from '../Redux/Actions/toggleFetching';

import { Row, Col, Layout, Spin } from "antd";
import ProductCard from "../Components/ProductCard";

const { Content } = Layout;

import { v4 as uuidv } from "uuid";

import "../scss/Pages/Products.scss";

/**
 * @class - This page is responsible for rendering any category of products. Fetch request and rendering for the relevant
 * category will be made according the passed props.
 * 
 * @param {string} type - should be passed as props to indicate the category of products that should be rendered on the page.
 */

// mapStateToProps is defined outside the class, this is used to access to pass the type props.
let type = null;

class Products extends Component {

  constructor(props){
    super(props);

    type = this.props.type;
  }

  async componentDidMount() {
    // toggleFetching is used for loading s
    this.props.toggleFetching();

    switch(this.props.type){
      case 'products':
        await this.props.getProducts();
        break;
      case 'laptops':
        await this.props.getLaptops();
        break;

      default: 
        await this.props.getProducts();
        break;
    }
    
    this.props.toggleFetching();
  }

  componentWillReceiveProps() {
    this.forceUpdate();
  }

  renderItems = () => {
    if (this.props.isFetching || !this.props.Products) {
      return <div className="product-spinner__positioning"><Spin size="large" /></div>
    }

    return this.props.Products.map((product) => {
      return (
        <Col xs={24} md={12} lg={8} className="content-position" key={uuidv()}>
          {/* Some formatting in description field to keep long descriptions manageable */}
          <ProductCard
            title={product.title}
            description={`${product.description.slice(0, 100).trim()}...`}
            self={product}
            key={uuidv()}
          />
        </Col>
      );
    });
  };

  render() {
    return (
      <Content className="container">
        <Row>{this.renderItems()}</Row>
      </Content>
    );
  }
}

const mapStateToProps = (store) => {
  
  switch(type){
    case 'products':
      return { Products: store.Products.AllProducts, isFetching: store.isFetching };
    case 'laptops':
      return { Products: store.Products.Laptops, isFetching: store.isFetching };
    case 'search':
      return {Products: store.Products.SearchResults, isFetching: store.isFetching};

    default: 
    return { Products: store.Products.AllProducts, isFetching: store.isFetching };
  }
  
};

export default connect(mapStateToProps, { getProducts, getLaptops, toggleFetching })(Products);
