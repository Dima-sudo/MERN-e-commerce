import React, { Component } from "react";

import HistoryItem from "../Components/HistoryItem";
import "../scss/Pages/Profile.scss";

import { connect } from "react-redux";
import { getListings } from "../Redux/Actions/ProductActions";

import { Empty } from "antd";

import { v4 as uuid } from "uuid";

import { Row, Col, Card, Button, Breadcrumb, Tabs, Timeline, Layout } from "antd";

const { TabPane } = Tabs;
const { Content } = Layout;

import { HomeOutlined, UserOutlined } from "@ant-design/icons";

class Profile extends Component {
  componentWillReceiveProps() {
    this.forceUpdate();
  }

  renderPurchases = () => {
    if (!this.props.purchases) {
      return <Empty description="No Data" />;
    }
  };

  renderListings = () => {
    if (this.props.UserListings) {
      const list = this.props.UserListings;

      return list.map((item) => {
        let image = null;
        // Formatting
        let date = item.created.split("T")[0];

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
    this.props.getListings();
  }

  renderTimeline = () => {
    return (
      <Timeline className="mt-3 ml-4">
        <Timeline.Item color="green">
          Create a services site 2020-09-01
        </Timeline.Item>
        <Timeline.Item color="green">
          Create a services site 2020-09-01
        </Timeline.Item>
        <Timeline.Item color="red">
          <p>Solve initial network problems 1</p>
          <p>Solve initial network problems 2</p>
          <p>Solve initial network problems 3 2020-09-01</p>
        </Timeline.Item>
        <Timeline.Item>
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2020-09-01</p>
        </Timeline.Item>
        <Timeline.Item color="gray">
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2020-09-01</p>
        </Timeline.Item>
        <Timeline.Item color="gray">
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2020-09-01</p>
        </Timeline.Item>
      </Timeline>
    );
  };

  renderBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <UserOutlined />
          <span>User</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  render() {
    return (
      <Content className="container">
        <Card title={this.renderBreadcrumb()} className="user-panel mt-5">
          <Button
            shape="round"
            className="user-panel__button"
            type="primary"
            size="large"
            danger
          >
            Deactivate Account
          </Button>
          <Button
            shape="round"
            className="user-panel__button"
            type="primary"
            size="large"
          >
            Reset Password
          </Button>
        </Card>

        <Card className="mt-5">
          <Tabs>
            {/* <TabPane tab="My Activity" key="activity-tab-key">
              <Row>
                <Col xs={24} md={24} lg={24}>
                  {this.renderTimeline()}
                </Col>
              </Row>
            </TabPane> */}

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
    UserListings: store.Products.UserListings,
  };
};

export default connect(mapStateToProps, { getListings })(Profile);
