import React, { Component } from "react";

import { connect } from "react-redux";
import { getProducts } from "../Redux/Actions/ProductActions";

import { Row, Col, Layout } from "antd";
import ProductCard from '../Components/ProductCard';

import { v4 as uuidv } from 'uuid';

const { Footer, Content } = Layout;

import "../scss/Pages/Products.scss";

class Products extends Component {

  constructor(props){
    super(props);
    this.state = {
      isFetching: true
    }
  }

  async componentDidMount() {
    await this.props.getProducts();
  }

  componentWillReceiveProps(){
    this.setState({
      isFetching: false
    });

    this.forceUpdate()
  }

  renderItems = () => {

    if(this.state.isFetching === true){
      return <h2>Loading...</h2>
    }

      return this.props.Products.map(product => {
        return(
          <Col xs={24} md={12} lg={8} className="content-position" key={uuidv()}>
            {/* Some formatting in description field to keep long descriptions manageable */}
                <ProductCard title={product.title} description={`${product.description.slice(0, 50).trim()}...`} self={product} key={uuidv()} />
          </Col>
        )
      })
  }

  render() {
    return (
      <div>
        <Layout>
          <Content className="container">
            <Row>
              {this.renderItems()}
            </Row>

          </Content>
        </Layout>

        <Footer>Footer</Footer>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return { Products: store.Products.AllProducts };
};

export default connect(mapStateToProps, { getProducts })(Products);
