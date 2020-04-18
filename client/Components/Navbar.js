import React from "react";

import { Menu, Button } from "antd";
import { MoreOutlined, LoginOutlined, ToTopOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import toggleDrawer from "../Redux/Actions/toggleDrawer";

import DrawerMenu from "../Components/DrawerMenu";

import { Link } from 'react-router-dom';

import "../scss/Components/Navbar.scss";

class Navbar extends React.Component {
  handleClick = () => {
    this.props.toggleDrawer();
  };

  render() {
    return (
      <React.Fragment>
        <Menu mode="horizontal" className="navbar container">
          <Button onClick={this.handleClick}>
            <MoreOutlined />
          </Button>
          <span />
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
        </Menu>

        <DrawerMenu />
      </React.Fragment>
    );
  }
}

export default connect(null, { toggleDrawer })(Navbar);
