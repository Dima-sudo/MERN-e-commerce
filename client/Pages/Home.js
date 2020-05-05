import React, { Component } from "react";
import { Timeline, Row, Col } from "antd";

import "../scss/Pages/Home.scss";

import Fast from "../Images/fast.svg";
import Global from "../Images/global.svg";
import New from "../Images/New.svg";

import { Statistic } from "antd";
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

class Home extends Component {
  render() {
    return (
      <React.Fragment>
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

        <section className="large-section__wrapper">
          <div className="container home-section__large">

            <div className="item-section__wrapper">

<Row>
    <Col xs={24} lg={8}>
            <span className="home-item">
              <h3 className="home-item__text">Fast</h3>
              <p>As fast as it gets</p>
              <img className="home-item__svg" src={Fast} alt="fast-image" />
            </span>
            </Col>  
            <Col xs={24} lg={8}> 
            <span className="home-item">
            <h3 className="home-item__text">New</h3>
            <p>A fresh design</p>
            <img className="home-item__svg" src={New} alt="new-image" />
            </span>
            </Col> 
            <Col xs={24} lg={8}>
            <span className="home-item">
              <h3 className="home-item__text">Global</h3>
              <p>Access from anywhere</p>
              <img className="home-item__svg" src={Global} alt="global-image" />
            </span>
            </Col>
            </Row>
            </div>

          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
