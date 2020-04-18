import React, { Component } from "react";

import { Layout, Card } from "antd";

const { Content } = Layout;

import { Form, Input, Button, Typography, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Link } from 'react-router-dom';

import { v4 as uuidv } from "uuid";

const { Text } = Typography;

import '../scss/Pages/Login.scss'

class Login extends Component {
  render() {
    return (
      <Layout>
        <Content className="container login-form">
        
          <Form
            size="middle"
            name="login_form"
            key={uuidv()}
            className="login-form my-5 py-5"
            initialValues={false}
          >

            <h1 className="login-form__title">Login</h1>      

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please fill out your Email" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
              />
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

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
            <Space size="small">
              <Button
                type="secondary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <Text>Don't have an account? <Link to="/">Signup</Link></Text></Space>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    );
  }
}

export default Login;
