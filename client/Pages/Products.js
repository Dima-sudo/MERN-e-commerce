import React, { Component } from "react";

import { connect } from "react-redux";
import { getProducts, getLaptops, getTelevisions, getPhones, getHeadphones, getOthers } from "../Redux/Actions/ProductActions";
import toggleFetching from '../Redux/Actions/toggleFetching';

import { Row, Col, Layout, Spin, Button } from "antd";
import ProductCard from "../Components/ProductCard";

import { Link } from 'react-router-dom';

import notFound from '../Images/not-found.svg'

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
      case 'televisions':
        await this.props.getTelevisions();
        break;
      case 'phones':
        await this.props.getPhones();
        break;
      case 'headphones':
        await this.props.getHeadphones();
        break;
      case 'others':
        await this.props.getOthers();
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
    if (this.props.isFetching) {
      return <div className="product-spinner__positioning"><Spin size="large" /></div>
    }
    if(!this.props.Products){
      return <div className="not-found__wrapper empty-positioning attention-wobble"><img src={notFound} /><h1>Whoops!</h1><p>We're sorry. Couldn't find what you're looking for, click here to try again.</p> <Button type="primary" size="large" shape="round"><Link to="/products/search">Try Again</Link></Button></div>
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
    case 'televisions':
      return { Products: store.Products.Televisions, isFetching: store.isFetching };
    case 'phones':
      return { Products: store.Products.Phones, isFetching: store.isFetching };
    case 'headphones':
      return { Products: store.Products.Headphones, isFetching: store.isFetching };
    case 'others':
      return { Products: store.Products.Others, isFetching: store.isFetching };
    case 'search':
      return {Products: store.Products.SearchResults, isFetching: store.isFetching};

    default: 
    return { Products: store.Products.AllProducts, isFetching: store.isFetching };
  }
  
};

export default connect(mapStateToProps, { getProducts, getLaptops, getTelevisions, getPhones, getHeadphones, getOthers, toggleFetching })(Products);
