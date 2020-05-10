import React, { Component } from "react";

import { connect } from "react-redux";
import { getLaptops } from "../Redux/Actions/ProductActions";
import toggleFetching from "../Redux/Actions/toggleFetching";

import { Row, Col, Spin } from "antd";
import ProductCard from "../Components/ProductCard";

import { v4 as uuidv } from "uuid";

import "../scss/Pages/Products.scss";

class Laptops extends Component {

  async componentDidMount() {
    this.props.toggleFetching()
    await this.props.getLaptops();  
    this.props.toggleFetching()
  }

  componentWillReceiveProps() {
    this.forceUpdate();
  }

  renderItems = () => {
    if (this.props.isFetching === true || !this.props.Products) {
      return <div className="product-spinner__positioning"><Spin size="large" /></div>;
    }

    return this.props.Products.map((product) => {
      return (
        <Col xs={24} md={12} lg={8} className="content-position" key={uuidv()}>
          {/* Some formatting in description field to keep long descriptions manageable */}
          <ProductCard
            className="grid-tile__align"
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
    return <Row className="container">{this.renderItems()}</Row>;
  }
}

const mapStateToProps = (store) => {
  return { Products: store.Products.Laptops, isFetching: store.isFetching };
};

export default connect(mapStateToProps, { getLaptops, toggleFetching })(Laptops);
