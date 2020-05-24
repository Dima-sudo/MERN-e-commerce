import React from "react";
import { Drawer, Menu } from "antd";
import { BulbOutlined, MessageOutlined, MailOutlined, ConsoleSqlOutlined, SearchOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import toggleDrawer from "../Redux/Actions/toggleDrawer";

import '../scss/Components/SideMenu.scss';

const { SubMenu } = Menu;

class SideMenu extends React.Component {

  render() {
    return (
      
          <Menu key="sider_menu" mode="inline" id="side-menu__wrapper" defaultSelectedKeys={['all_products']}
          defaultOpenKeys={['all_products']}>
              <SubMenu title="Products" key="all_products">
            <Menu.Item key="products_side_menu">
              <BulbOutlined />
              <Link to="/products">Explore</Link>
            </Menu.Item>
            <Menu.Item key="laptops_side_menu">
              <ConsoleSqlOutlined />
              <Link to="/products/laptops">Laptops</Link>
            </Menu.Item>
            </SubMenu>


            <Menu.Item key="about_side_menu">
              <MessageOutlined />
              <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="mail_side_menu">
            <MailOutlined />
            <Link to="/contact">Contact Us</Link>
          </Menu.Item>

          <Menu.Item key="search_side_menu">
              <SearchOutlined />
              <Link to="/products/search">Search</Link>
          </Menu.Item>

          
          </Menu>
        
    );
  }
}

const mapStateToProps = (store) => {
  return { visible: store.toggleDrawer };
};

export default connect(mapStateToProps, { toggleDrawer })(SideMenu);
