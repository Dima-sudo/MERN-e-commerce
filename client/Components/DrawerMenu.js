import React from "react";
import { Drawer, Menu } from "antd";
import { BulbOutlined, MessageOutlined, MailOutlined, ConsoleSqlOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import toggleDrawer from "../Redux/Actions/toggleDrawer";

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
          <Menu key="drawer_inner_menu">
              <Menu.ItemGroup title="Products">
            <Menu.Item key="products" onClick={this.onClose}>
              <BulbOutlined />
              <Link to="/products">Explore</Link>
            </Menu.Item>
            <Menu.Item key="laptops" onClick={this.onClose}>
              <ConsoleSqlOutlined />
              <Link to="/products/laptops">Laptops</Link>
            </Menu.Item>
            </Menu.ItemGroup>


            <Menu.Item key="about" onClick={this.onClose}>
              <MessageOutlined />
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="mail" onClick={this.onClose}>
            <MailOutlined />
            Contact Us
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
