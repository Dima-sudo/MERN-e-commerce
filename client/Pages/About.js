import React, { Component } from "react";

import { Layout } from "antd";

const { Content } = Layout;

import "../scss/Pages/About.scss";

import AboutUs from "../Images/about.svg";

class About extends Component {
  render() {
    return (
      <Content className="container about-section">
          <h1>Our Philosophy</h1>
          <p>
            We offer competitive pricing on an unparalleled product selection,
            with a firm commitment to on-time order fulfillment. We empower
            customers to make the best purchasing decisions by offering detailed
            product information, product tutorials and the opportunity to
            network with other members of the community. Customer satisfaction
            is our top priority, achieved by delivering superior service with
            our ever-present philosophy of putting the customer first.
          </p>
          <img src={AboutUs} alt="about-us-image" />
      </Content>
    );
  }
}

export default About;
