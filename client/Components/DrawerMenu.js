import React from "react";
import { Drawer, Menu } from "antd";
import {
  BulbOutlined,
  MessageOutlined,
  MailOutlined,
  ConsoleSqlOutlined,
  SearchOutlined,
  FullscreenOutlined,
  PhoneOutlined,
  CustomerServiceOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import toggleDrawer from "../Redux/Actions/toggleDrawer";

const { SubMenu } = Menu;

class DrawerMenu extends React.Component {
  onClose = () => {
    this.props.toggleDrawer();
  };

  render() {
    return (
      <div>
        <Drawer
          title="Menu"
          placement="left"
          closable={true}
          visible={this.props.visible}
          onClose={this.onClose}
          key="drawer_menu"
        >
          <Menu key="drawer_inner_menu" mode="inline">
            <SubMenu title="Products">
              <Menu.Item key="products" onClick={this.onClose}>
                <BulbOutlined />
                <Link to="/products">Explore</Link>
              </Menu.Item>
              <Menu.Item key="laptops" onClick={this.onClose}>
                <ConsoleSqlOutlined />
                <Link to="/products/laptops">Laptops</Link>
              </Menu.Item>
              <Menu.Item key="televisions" onClick={this.onClose}>
                <FullscreenOutlined />
                <Link to="/products/televisions">Televisions</Link>
              </Menu.Item>
              <Menu.Item key="phones" onClick={this.onClose}>
                <PhoneOutlined />
                <Link to="/products/phones">Phones</Link>
              </Menu.Item>
              <Menu.Item key="headphones" onClick={this.onClose}>
                <CustomerServiceOutlined />
                <Link to="/products/headphones">Phones</Link>
              </Menu.Item>
              <Menu.Item key="other_items" onClick={this.onClose}>
                <ShoppingOutlined />
                <Link to="/products/other">Other</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="about" onClick={this.onClose}>
              <MessageOutlined />
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="mail" onClick={this.onClose}>
              <MailOutlined />
              <Link to="/contact">Contact Us</Link>
            </Menu.Item>

            <Menu.Item key="search" onClick={this.onClose}>
              <SearchOutlined />
              <Link to="/products/search">Search</Link>
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return { visible: store.toggleDrawer };
};

export default connect(mapStateToProps, { toggleDrawer })(DrawerMenu);
