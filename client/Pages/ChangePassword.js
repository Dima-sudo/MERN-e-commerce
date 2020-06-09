import React, { Component } from "react";

import { Form, Input, Button, Card, Space, Layout, notification } from "antd";

const { Content } = Layout;

import { SmileOutlined } from "@ant-design/icons"

import { Redirect, Link } from "react-router-dom";

import "../scss/Pages/CreateProduct.scss";

import { connect } from "react-redux";
import { switchPassword } from "../Redux/Actions/AuthActions";


class ChangePassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirmPassword: '',
      newPassword: '',
      hasSubmitted: false,
    };
  }

  handleChange = (e) => {
    if (typeof e[0] === "undefined") return;

    const key = e[0].name[0];
    const value = e[0].value;

    this.setState({
      [key]: value,
    });
  };

  submitForm = () => {

    console.log("Resetting your password");

    // Notification that dissapears after a few seconds
      notification.open({
      message: 'Working on it',
      description:
        'We asked the server to process your request. This might take a moment',
      icon: <SmileOutlined style={{ color: '#0070ba' }} />,
     });

      const form = {
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        newPassword: this.state.newPassword
      }

      // Redux action creator
      this.setState({ hasSubmitted: true });
      this.props.switchPassword(form);
    
  };

  render() {
    return this.state.hasSubmitted === true ? (
      <Redirect to="/" />
    ) : (
      <Content className="container">
        <Card title="Create Comment" className="my-5 slide-in">
          <Form
            size="middle"
            name="create_form"
            key="laptop_form_key"
            className="create-form my-3"
            onFieldsChange={this.handleChange}
            onFinish={this.submitForm}
            fields={[
              {
                name: ["password"],
                value: this.state.password,
              },
              {
                name: ["confirmPassword"],
                value: this.state.confirmPassword,
              },
              {
                name: ["newPassword"],
                value: this.state.newPassword,
              },
            ]}
          >
            <h1 className="create-form__title">Change Password</h1>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please fill out the password" },
              ]}
            >
              <Input placeholder="Password" name="password" type="password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password" },
              ]}
            >
              <Input placeholder="Confirm Password" name="confirmPassword" type="password" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Please fill out your new password" },
              ]}
            >
              <Input placeholder="New Password" name="newPassword" type="password" />
            </Form.Item>

            <Form.Item className="pt-2">
              <Space size="small">
                {/* Conditional rendering */}
                <Button type="primary" htmlType="submit">
                  Change
                </Button>
                <Button type="secondary">
                  <Link to="/profile">Back</Link>
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

export default connect(mapStateToProps, { switchPassword })(ChangePassword);
