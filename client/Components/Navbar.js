import React from "react";

import { Menu, Button, Alert } from "antd";
import { RightOutlined, LoginOutlined, ToTopOutlined } from "@ant-design/icons";
import toggleDrawer from "../Redux/Actions/toggleDrawer";
import DrawerMenu from "../Components/DrawerMenu";
import Viewed from '../Components/Viewed';

import { connect } from "react-redux";
import { logout } from "../Redux/Actions/AuthActions";

import { Link } from "react-router-dom";

import "../scss/Components/Navbar.scss";

import { toggleHistory } from '../Redux/Actions/HistoryActions'


class Navbar extends React.Component {
  renderNavbar = () => {
    // If no user is logged in
    if (this.props.isLoggedIn === null) {
      return (
        <React.Fragment>
          <Menu mode="horizontal" id="navbar__wrapper">
            <Menu.Item key="drawer_button" id="navbar-drawer__button">
              <Button onClick={this.handleClick}>
                <span className="sidebar-icon__positioning">
                  <RightOutlined />
                </span>
              </Button>
            </Menu.Item>
            <span />
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="login">
              <Link to="/login">
                <LoginOutlined />
                Login
              </Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link to="/signup">
                <ToTopOutlined />
                Signup
              </Link>
            </Menu.Item>

            <Menu.Item key="history" onClick={this.props.toggleHistory} id="navbar-viewed__button">
              Viewed
            </Menu.Item>

            <Menu.Item key="navbar_search" id="navbar-search__button">
              <Button>
                <Link to="/products/search">
                  Looking for something specific?
                </Link>
              </Button>
            </Menu.Item>
          </Menu>

          <DrawerMenu />
          <Viewed />

        </React.Fragment>
      );
    }

    // Navbar for a logged in user
    return (
      <React.Fragment>
        <Menu mode="horizontal" className="navbar" id="navbar__wrapper">
          <Menu.Item key="drawer_button" id="navbar-drawer__button">
            <Button onClick={this.handleClick}>
              <span className="sidebar-icon__positioning">
                <RightOutlined />
              </span>
            </Button>
          </Menu.Item>
          <span />
          <Menu.Item key="home">
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="user_profile">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="create_listing">
            <Link to="/products/create">Create Listing</Link>
          </Menu.Item>
          <Menu.Item key="signout" onClick={this.props.logout}>
            <Link to="/">Signout</Link>
          </Menu.Item>

          <Menu.Item key="history" onClick={this.props.toggleHistory} id="navbar-viewed__button">
              Viewed
          </Menu.Item>

          <Menu.Item key="navbar_search" id="navbar-search__button">
            <Button>
              <Link to="/products/search">Looking for something specific?</Link>
            </Button>
          </Menu.Item>
        </Menu>

        <DrawerMenu />
        <Viewed />

      </React.Fragment>
    );
  };

  handleClick = () => {
    this.props.toggleDrawer();
  };

  render() {
    return this.renderNavbar();
  }
}

const mapStateToProps = (store) => {
  return { isLoggedIn: store.isLoggedIn };
};

export default connect(mapStateToProps, { toggleDrawer, logout, toggleHistory })(Navbar);
