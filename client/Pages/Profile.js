import React, { Component } from "react";

import HistoryItem from "../Components/HistoryItem";
import "../scss/Pages/Profile.scss";

import { connect } from "react-redux";
import { getListings, getPurchases } from "../Redux/Actions/ProductActions";

import { Empty } from "antd";

import { v4 as uuid } from "uuid";

import { Redirect, Link } from 'react-router-dom';

import { Row, Col, Card, Button, Breadcrumb, Tabs, Layout } from "antd";


const { TabPane } = Tabs;
const { Content } = Layout;

import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import CustomModal from '../Components/CustomModal';

import axios from 'axios';

import SetModal from '../Redux/Actions/ModalActions';


class Profile extends Component {

  // Shows confirmation modal
  popConfirmDeactivate = () => {
    this.props.SetModal({
      title: 'Confirm Account Deactivation',
      text: 'Sorry to see you go. Are you sure you want to delete this account?',
      visible: true
    })
  }

  // Actual account deactivation request
  deactivateAccount = async () => {
  
      const options = {
        headers: {
          'Authorization': `Bearer ${this.props.isLoggedIn.token}`
        }
      }

     const res = await axios.delete(`${process.env.SERVER_URL}/auth/deactivate`, options);

     return res;
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.UserListings === nextProps.UserListings){
      return false;
    }
    return true;
  }

  renderPurchases = () => {
    if (!this.props.UserPurchases) {
      return <Empty description="No Data" />;
    }

    if (this.props.UserPurchases) {
      const list = this.props.UserPurchases;

      return list.map((item) => {
        let image = null;
        // Formatting
        let unformattedDate = item.created.split("T")[0].split('-');
        let date = `${unformattedDate[2]}/${unformattedDate[1]}/${unformattedDate[0]}`;
        //

        // If an image exists get the url. The component knows how to handle cases with no image
        if (item.images.length > 0) image = item.images[0].url;

        return (
          <HistoryItem
            title={item.title}
            date={date}
            price={item.price}
            description={item.description}
            image={image}
            self={item}
            key={uuid()}
            variant='display'
          />
        );
      });
    }
  };

  renderListings = () => {
    if (this.props.UserListings) {
      const list = this.props.UserListings;

      return list.map((item) => {
        let image = null;
        // Formatting
        let unformattedDate = item.created.split("T")[0].split('-');
        let date = `${unformattedDate[2]}/${unformattedDate[1]}/${unformattedDate[0]}`;
        //

        // If an image exists get the url. The component knows how to handle cases with no image
        if (item.images.length > 0) image = item.images[0].url;

        return (
          <HistoryItem
            title={item.title}
            date={date}
            price={item.price}
            description={item.description}
            image={image}
            self={item}
            key={uuid()}
          />
        );
      });
    }

    return <Empty description="No Data" />;
  };

  componentDidMount() {
    if(this.props.isLoggedIn){
      this.props.getListings();
      this.props.getPurchases();
    }
  }

  renderBreadcrumb = () => {
    const name = this.props.isLoggedIn.email.split('@')[0][0].toUpperCase() + this.props.isLoggedIn.email.split('@')[0].slice(1);

    return (
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <UserOutlined />
          <span>{name}</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  render() {
    return (
      !this.props.isLoggedIn ? <Redirect to="/login" /> 
      :
      <Content className="container">

        <CustomModal action={this.deactivateAccount} />

        <Card title={this.renderBreadcrumb()} className="user-panel mt-5 slide-in">
          <Button
            shape="round"
            className="user-panel__button"
            type="primary"
            size="large"
            danger
            onClick={this.popConfirmDeactivate}
          >
            Deactivate Account
          </Button>
          <Button type="primary" shape="round" size="large">
            <Link to="/products/create">
              Create A New Listing
            </Link>
          </Button>
          <Button
            shape="round"
            className="user-panel__button"
            size="large"
          >
            <Link to="/change-password">
              Change Password
            </Link>
          </Button>
          <Button
            shape="round"
            className="user-panel__button"
            size="large"
          >
            <Link to="/contact">
              Need Help?
            </Link>
          </Button>
        </Card>

        <Card className="mt-5 slide-in-side">
          <Tabs>

            <TabPane tab="My Listings" key="history-tab-key">
              <Row>
                <Col xs={24} md={24} lg={24}>
                  {this.renderListings()}
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Purchases" key="purchases-tab-key">
              <Row>
                <Col xs={24} md={24} lg={24}>
                  {this.renderPurchases()}
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
        </Content>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    UserListings: store.Products.UserListings, isLoggedIn: store.isLoggedIn, UserPurchases: store.Products.UserPurchases
  };
};

export default connect(mapStateToProps, { getListings, getPurchases, SetModal })(Profile);
