import React, { Component } from "react";

import { Layout, Card } from "antd";

import { Form, Input, Button, Typography, Space, Spin, Breadcrumb } from "antd";
import { UserOutlined, LockOutlined, HomeOutlined } from "@ant-design/icons";

const { Content } = Layout;

import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { login } from "../Redux/Actions/AuthActions";
import toggleFetching from "../Redux/Actions/toggleFetching";

const { Text } = Typography;

import "../scss/Pages/Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  renderBreadcrumb = () => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <Space>
            <UserOutlined />
            Login
          </Space>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  // Conditional of form and spinner animation
  renderForm = () => {
    // If there's a user redirect to homepage and turn off the isFetching loader flag
    if (this.props.isLoggedIn !== null) {
      this.props.toggleFetching();
      return <Redirect to="/" />;
    } else if (this.props.isFetching === true) {
      return (
        <span className="login-spinner__positioning">
          <Spin size="large" className="my-5 py-5" />
        </span>
      );
    } else if (this.props.isLoggedIn === null) {
      return (
        <Form
          className="login-form"
          size="middle"
          name="login_form"
          key="login_form_key"
          className="login-form my-3"
          onFieldsChange={this.handleChange}
          fields={[
            {
              name: ["email"],
              value: this.state.email,
            },
            {
              name: ["password"],
              value: this.state.password,
            },
          ]}
          onFinish={this.submitForm}
        >
          <h1 className="login-form__title">Login</h1>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please fill out your Email" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" name="email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please fill out your Password" },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Space size="small">
              <Button type="secondary" htmlType="submit">
                Log in
              </Button>
              <Text>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </Text>
            </Space>
          </Form.Item>
        </Form>
      );
    }
  };

  submitForm = async () => {
    const form = {
      email: this.state.email,
      password: this.state.password,
    };

    // isFetching is used for conditional rendering
    this.props.toggleFetching();
    await this.props.login(form);
  };

  handleChange = (e) => {
    if (typeof e[0] === "undefined") return;

    const key = e[0].name[0];
    const value = e[0].value;

    this.setState({
      [key]: value,
    });
  };

  render() {
    return (
      <Content className="container">
        <Card title={this.renderBreadcrumb()} className="my-5 slide-in">
          {this.renderForm()}
        </Card>
      </Content>
    );
  }
}

const mapStateToProps = (store) => {
  return { isLoggedIn: store.isLoggedIn, isFetching: store.isFetching };
};

export default connect(mapStateToProps, { login, toggleFetching })(Login);
