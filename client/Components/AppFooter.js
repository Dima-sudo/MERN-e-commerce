import React from "react";
import "../scss/Components/Footer.scss";

import { Layout } from "antd";

import { Link } from "react-router-dom";

const { Content } = Layout;

function AppFooter() {
  return (
    <Content>
      <section className="footer-wrapper">
        <div className="container-stretch mb-n2">
          <div className="footer-section__items my-4">
            <ul className="footer-list__positioning footer-inline__item">
              <Link to="/">Home</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </ul>
            <ul className="footer-list__positioning footer-inline__item">
              <Link to="/products/search">Search</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/contact">Reviews</Link>
            </ul>
            <ul className="footer-list__positioning footer-inline__item">
              <Link to="/products">Explore</Link>
              <Link to="/profile">Profile</Link>
              <a href="https://www.google.com">External Links</a>
            </ul>
          </div>

          <p className="footer-inline__item">
            © Copyright 2015-2020 by Company corp. All Rights Reserved.
          </p>
          <div className="footer-inline__item">
            <i className="fab fa-twitter fa-2x mx-3 mb-4" />
            <i className="fab fa-facebook fa-2x mx-3 mb-4" />
            <i className="fab fa-instagram fa-2x mx-3 mb-4" />
            <i className="fab fa-linkedin fa-2x mx-3 mb-4" />
          </div>
        </div>
      </section>
    </Content>
  );
}

export default AppFooter;
