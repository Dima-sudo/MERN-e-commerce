import React, { Component } from "react";

import { Form, Input, Button, Card, Space, Layout, Breadcrumb, Spin } from "antd";

const { Content } = Layout;

import { Redirect, Link } from "react-router-dom";

import "../scss/Pages/CreateProduct.scss";

import { connect } from "react-redux";

import { search } from "../Redux/Actions/ProductActions";

import toggleFetching from "../Redux/Actions/toggleFetching";

import { HomeOutlined, SearchOutlined } from "@ant-design/icons";


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      hasSubmitted: false,
    };
  }

  renderBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          Products
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Space>
            <SearchOutlined />
            Search
          </Space>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  handleChange = (e) => {
    if (typeof e[0] === "undefined") return;

    const key = e[0].name[0];
    const value = e[0].value;

    this.setState({
      [key]: value,
    });
  };

  submitSearch = async () => {
    console.log("Search submitted");

    const query = this.state.query;

    this.props.toggleFetching();
    await this.props.search(query);
    this.props.toggleFetching();

    this.setState({
      hasSubmitted: true,
    });
  };

  render() {
    return this.state.hasSubmitted === true ? (
      <Redirect to="/products/search/results" />
    ) : (
      <Content className="container">
        {/* {this.props.isFetching || !this.props.Products} ? <div className="product-spinner__positioning"><Spin size="large" /></div>
          : */}
        <Card title={this.renderBreadcrumb()} className="my-5 slide-in">
          <Form
            size="middle"
            name="search_form"
            key="search_form_key"
            className="create-form my-3"
            onFieldsChange={this.handleChange}
            onFinish={this.submitSearch}
            fields={[
              {
                name: ["query"],
                value: this.state.query,
              },
            ]}
          >
            <h1 className="create-form__title">Search</h1>

            <Form.Item
              name="query"
              rules={[
                { required: true, message: "Please fill out the content" },
              ]}
            >
              <Input placeholder="What are you looking for?" name="query" />
            </Form.Item>

            <Form.Item className="pt-2">
              <Space size="small">
                {/* Conditional rendering */}
                <Button type="primary" htmlType="submit">
                  <SearchOutlined />
                  Search
                </Button>
                <Button type="secondary">
                  <Link to="/products">Back</Link>
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    );
  }
}

const mapStateToProps = (store) => {
  return { isLoggedIn: store.isLoggedIn };
};

export default connect(mapStateToProps, { search, toggleFetching })(Search);
