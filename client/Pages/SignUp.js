import React, { Component } from "react";

import { Layout, Card, message } from "antd";

import { Form, Input, Button, Space, Spin, Breadcrumb } from "antd";
import { UserOutlined, LockOutlined, HomeOutlined } from "@ant-design/icons";

const { Content } = Layout;

import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import toggleFetching from "../Redux/Actions/toggleFetching";

import axios from 'axios';

import "../scss/Pages/Login.scss";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      isSuccess: false
    };
  }

  renderBreadcrumb = () =>{
    return(
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>Sign Up</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }

  // Conditional of form and spinner animation
  renderForm = () => {
     if(this.props.isFetching === true){
       return <div>Loading...</div>
     }
     
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
          {
            name: ["confirmPassword"],
            value: this.state.confirmPassword,
          }
        ]}
        onFinish={this.submitForm}
      >
        <h1 className="login-form__title">Sign Up</h1>

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

        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your password" },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>


        <Form.Item>
          <Space size="small">
            <Button type="secondary" htmlType="submit">
              Sign Up
            </Button>
          </Space>
        </Form.Item>

      </Form>
    );
    
  };

  submitForm = async () => {
    const form = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    // isFetching is used for conditional rendering
    this.props.toggleFetching();
    
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }

    const res = await axios.post(`${process.env.SERVER_URL}/auth/signup`, form, options);
    
    console.log(res.data);

    if(res.data.status === 'success'){
      message.success('Your account was successfully created', 4);
      this.props.toggleFetching();

      this.setState({isSuccess: true});
    }
    else if(res.data.status === 'failure'){
      this.props.toggleFetching();
      message.warning(`${res.data.message}`, 4);
    }

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
      this.state.isSuccess === true ? <Redirect to="/login" />
      :
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

export default connect(mapStateToProps, { toggleFetching })(SignUp);
