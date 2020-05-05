import React, { Component } from "react";

import { connect } from "react-redux";
import { getLaptops } from "../Redux/Actions/ProductActions";

import { Row, Col } from "antd";
import ProductCard from "../Components/ProductCard";

import { v4 as uuidv } from "uuid";

import "../scss/Pages/Products.scss";

class Laptops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
    };
  }

  async componentDidMount() {
    await this.props.getLaptops();
  }

  componentWillReceiveProps() {
    this.setState({
      isFetching: false,
    });

    this.forceUpdate();
  }

  renderItems = () => {
    if (this.state.isFetching === true) {
      return <h2>Loading...</h2>;
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
  return { Products: store.Products.Laptops };
};

export default connect(mapStateToProps, { getLaptops })(Laptops);
