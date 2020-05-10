import React, { Component } from "react";

import { connect } from "react-redux";
import { getProducts } from "../Redux/Actions/ProductActions";
import toggleFetching from '../Redux/Actions/toggleFetching';

import { Row, Col, Layout, Spin } from "antd";
import ProductCard from "../Components/ProductCard";

const { Content } = Layout;

import { v4 as uuidv } from "uuid";

import "../scss/Pages/Products.scss";

class Products extends Component {

  async componentDidMount() {
    this.props.toggleFetching();
    await this.props.getProducts();
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
            description={`${product.description.slice(0, 50).trim()}...`}
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
  return { Products: store.Products.AllProducts, isFetching: store.isFetching };
};

export default connect(mapStateToProps, { getProducts, toggleFetching })(Products);
