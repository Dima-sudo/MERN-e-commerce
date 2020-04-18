import React from "react";
import { Drawer, Menu } from "antd";
import { SkinOutlined, MessageOutlined, MailOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv } from 'uuid';

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
          key={uuidv()}
        >
          <Menu key={uuidv()}>
              <Menu.ItemGroup title="Products">
            <Menu.Item key="products" onClick={this.onClose}>
              <SkinOutlined />
              <Link to="/products">Products</Link>
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
