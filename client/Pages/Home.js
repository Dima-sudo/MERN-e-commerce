import React, { Component } from "react";
import { Timeline, Row, Col } from "antd";

import "../scss/Pages/Home.scss";

import Fast from "../Images/fast.svg";
import Global from "../Images/global.svg";
import New from "../Images/New.svg";

import { Statistic, Layout } from "antd";
import { getRandIndex } from '../Utility/Misc';

import { getProducts } from "../Redux/Actions/ProductActions";
import toggleFetching from "../Redux/Actions/toggleFetching";

import { connect } from "react-redux";

import { v4 as uuidv } from "uuid";

import ProductCard from "../Components/ProductCard";


const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const { Content } = Layout;

class Home extends Component {
  renderCards = () => {
    if (this.props.isFetching === true || !this.props.products) {
      return <div>Loading...</div>;
    }

    /**
     * Pulls out 3 random products using a randomly generated index for display.
     */
    const randIndex_1 = getRandIndex(this.props.products.length);
    const randIndex_2 = getRandIndex(this.props.products.length);
    const randIndex_3 = getRandIndex(this.props.products.length);

    return (
      <Row>
        <Col xs={24} md={12} lg={8} key={uuidv()} className="content-position">
          {/* Some formatting in description field to keep long descriptions manageable */}
          <ProductCard
            title={this.props.products[randIndex_1].title}
            description={`${this.props.products[randIndex_1].description
              .slice(0, 100)
              .trim()}...`}
            self={this.props.products[randIndex_1]}
            key={uuidv()}
          />
        </Col>
        <Col xs={24} md={12} lg={8} key={uuidv()} className="content-position">

          <ProductCard
            title={this.props.products[randIndex_2].title}
            description={`${this.props.products[randIndex_2].description
              .slice(0, 100)
              .trim()}...`}
            self={this.props.products[randIndex_2]}
            key={uuidv()}
          />
         </Col>

         <Col xs={24} md={12} lg={8} key={uuidv()} className="content-position">
          <ProductCard
            title={this.props.products[randIndex_3].title}
            description={`${this.props.products[randIndex_3].description
              .slice(0, 100)
              .trim()}...`}
            self={this.props.products[randIndex_3]}
            key={uuidv()}
          />
          
           </Col>
       </Row>
    );
  };

  async componentDidMount() {
    this.props.toggleFetching();
    await this.props.getProducts();
    this.props.toggleFetching();
  }

  render() {
    return (
      <React.Fragment>
        <Content>

          {/* Teaser */}
          <section className="large-section__wrapper">
            <div className="container home-section__large">
              <h1>It's coming, soon.</h1>
              <Countdown
                className="home-countdown"
                value={deadline}
                format="HH:mm:ss"
              />
            </div>
          </section>

          {/* Timeline */}
          <section className="medium-section__wrapper">
            <div className="container home-section__medium">
              <h1>Shopping made easy</h1>

              <div>
                <Timeline className="size">
                  <Timeline.Item color="orange">Sign Up</Timeline.Item>
                  <Timeline.Item color="blue">Browse</Timeline.Item>
                  <Timeline.Item color="green">Purchase</Timeline.Item>
                </Timeline>
              </div>
            </div>
          </section>

          {/* SVGs */}
          <section className="large-section__wrapper">
            <div className="container home-section__large">
              <div className="item-section__wrapper">
                <Row>
                  <Col xs={24} lg={8}>
                    <span className="home-item">
                      <h3 className="home-item__text">Fast</h3>
                      <p>As fast as it gets</p>
                      <img
                        className="home-item__svg"
                        src={Fast}
                        alt="fast-image"
                      />
                    </span>
                  </Col>
                  <Col xs={24} lg={8}>
                    <span className="home-item">
                      <h3 className="home-item__text">New</h3>
                      <p>A fresh design</p>
                      <img
                        className="home-item__svg"
                        src={New}
                        alt="new-image"
                      />
                    </span>
                  </Col>
                  <Col xs={24} lg={8}>
                    <span className="home-item">
                      <h3 className="home-item__text">Global</h3>
                      <p>Access from anywhere</p>
                      <img
                        className="home-item__svg"
                        src={Global}
                        alt="global-image"
                      />
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
          </section>

            {/* Cards */}
            <section className="card-section__wrapper">
              <div className="container-stretch home-section__cards">
                <div className="item-wrapper__cards">
                  <h1>What's hot right now?</h1>
                  {this.renderCards()}
                </div>
              </div>
          </section>
        </Content>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    products: store.Products.AllProducts,
    isFetching: store.isFetching,
  };
};

export default connect(mapStateToProps, { getProducts, toggleFetching })(Home);
