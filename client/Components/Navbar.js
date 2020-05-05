import React from "react";

import { Menu, Button, Alert } from "antd";
import { RightOutlined, LoginOutlined, ToTopOutlined } from "@ant-design/icons";
import toggleDrawer from "../Redux/Actions/toggleDrawer";
import DrawerMenu from "../Components/DrawerMenu";

import { connect } from "react-redux";
import { logout } from '../Redux/Actions/AuthActions';

import { Link } from "react-router-dom";

import "../scss/Components/Navbar.scss";

class Navbar extends React.Component {
  renderNavbar = () => {
    // If no user is logged in
    if (this.props.isLoggedIn === null) {
      return (
        <React.Fragment>
          <Menu mode="horizontal" className="">
            <Menu.Item key="drawer_button">
              <Button onClick={this.handleClick}>
                <span className="sidebar-icon__positioning">
                  <RightOutlined />
                </span>
              </Button>
            </Menu.Item>
            <span />
            <Menu.Item key="login">
              <Link to="/login">
                {/* <LoginOutlined /> */}
                Login
              </Link>
            </Menu.Item>
            <Menu.Item key="signup">
              <Link to="/signup">
                {/* <ToTopOutlined /> */}
                Signup
              </Link>
            </Menu.Item>
          </Menu>

          <DrawerMenu />
        </React.Fragment>
      );
    }

    // Navbar for a logged in user
    return (
      <React.Fragment>

        <Menu mode="horizontal" className="navbar container">
          <Menu.Item key="drawer_button">
            <Button onClick={this.handleClick}>
              <span className="sidebar-icon__positioning">
                <RightOutlined />
              </span>
            </Button>
          </Menu.Item>
          <span />
          <Menu.Item key="user_profile">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="create_listing">
            <Link to="/products/create">Create Listing</Link>
          </Menu.Item>
          <Menu.Item key="signout" onClick={this.props.logout}>
            <Link to="/">Signout</Link>
          </Menu.Item>
        </Menu>

        <DrawerMenu />
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

export default connect(mapStateToProps, { toggleDrawer, logout })(Navbar);
