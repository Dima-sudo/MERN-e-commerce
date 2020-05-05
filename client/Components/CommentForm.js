import React, { Component } from "react";

import { Form, Input, Button, Card, Space, Layout} from "antd";

const { Content } = Layout;

import { Redirect, Link } from "react-router-dom";

import "../scss/Pages/CreateProduct.scss";

import { connect } from "react-redux";
import { CreateComment } from "../Redux/Actions/CommentActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      didSubmit: false,
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

  submitComment = () => {

    const itemId = this.props.location.self._id;

    const content = {
      content: this.state.content,
    };

    console.log("Comment submitted");

    // Redux action creator
    this.setState({ didSubmit: true });
    this.props.CreateComment(content, itemId);

  };

  render() {
    return this.state.didSubmit === true ? (
      <Redirect to="/products" />
    ) : (
          <Content className="container">
        <Card title="Create Comment" className="my-5">
          <Form
            size="middle"
            name="create_form"
            key="laptop_form_key"
            className="create-form my-3"
            onFieldsChange={this.handleChange}
            onFinish={this.submitComment}
            fields={[
              {
                name: ["content"],
                value: this.state.content,
              },
            ]}
          >
            <h1 className="create-form__title">New Comment</h1>

            <Form.Item
              name="content"
              rules={[
                { required: true, message: "Please fill out the content" },
              ]}
            >
              <Input placeholder="Content" name="content" />
            </Form.Item>

            <Form.Item className="pt-2">
              <Space size="small">
                {/* Conditional rendering */}
                <Button type="primary" htmlType="submit">
                  Create
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

export default connect(null, { CreateComment })(CommentForm);
