import React, { Component } from "react";

import {
  Form,
  Input,
  Button,
  Card,
  Space,
  Layout,
  message,
  notification,
  Breadcrumb
} from "antd";

import { SmileOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { TextArea } = Input;

import { Redirect, Link } from "react-router-dom";

import "../scss/Pages/CreateProduct.scss";

import { connect } from "react-redux";

import axios from "axios";

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      title: "",
      from: "",
      hasSubmitted: false,
    };
  }


  renderBreadcrumb = () => {
    let name = null;

    if (this.props.isLoggedIn) {
      name =
        this.props.isLoggedIn.email.split("@")[0][0].toUpperCase() +
        this.props.isLoggedIn.email.split("@")[0].slice(1);
    }

    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <UserOutlined />
          <span>{name}</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Space>
            Contact Us
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

  submitForm = async () => {
    console.log("Contact submitted");

    const content = {
      content: this.state.content,
      title: this.state.title,
      from: this.state.from,
    };

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${process.env.SERVER_URL}/misc/contact`,
      content,
      options
    );

    if (res.data.status === "success") {
      // Notification that dissapears after a few seconds
      notification.open({
        message: "Working on it",
        description:
          "Hey, thanks for contacting us. Your mail was sent and we'll get back to you as soon as we can",
        icon: <SmileOutlined style={{ color: "#0070ba" }} />,
        duration: 8,
      });
      message.success("Your mail was sent, we'll get back to you in a bit", 6);
      this.setState({ hasSubmitted: true });
    } else if (res.data.status === "failure") {
      message.error("Couldn't send the email, please try again in a moment", 6);
      notification.info({
        message: "Working on it",
        description:
          "Whoops, there was an issue sending your email. This is probably a server problem, try again soon while we're working on a fix.",
        duration: 8,
      });
    }
  };

  render() {
    return this.state.hasSubmitted === true ? (
      <Redirect to="/products" />
    ) : (
      <Content className="container slide-fwd-center">
        <Card title={this.renderBreadcrumb()} className="my-5 slide-in">
          <Form
            size="middle"
            name="contact_form"
            key="contact_form_key"
            className="create-form my-3"
            onFieldsChange={this.handleChange}
            onFinish={this.submitForm}
            fields={[
              {
                name: ["title"],
                value: this.state.title,
              },
              {
                name: ["content"],
                value: this.state.content,
              },
              {
                name: ["from"],
                value: this.state.from,
              },
            ]}
          >
            <h1 className="create-form__title">Contact Us</h1>

            <Form.Item
              name="title"
              rules={[{ required: true, message: "Please fill out the title" }]}
            >
              <Input placeholder="Title" name="title" />
            </Form.Item>

            <Form.Item
              name="content"
              rules={[
                { required: true, message: "Please fill out the content" },
              ]}
            >

              <TextArea
                name="content"
                placeholder="What's on your mind?"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />

            </Form.Item>

            <Form.Item
              name="from"
              rules={[
                {
                  required: true,
                  message: "Please fill out your contact email",
                },
              ]}
            >
              <Input placeholder="Email" name="from" />
            </Form.Item>

            <Form.Item className="pt-2">
              <Space size="small">
                {/* Conditional rendering */}
                <Button type="primary" htmlType="submit">
                  Send
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

export default connect(mapStateToProps)(Contact);
